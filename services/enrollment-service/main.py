from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import database
import auth
from pydantic import BaseModel

app = FastAPI(title="Enrollment Service")

# Initialize database tables
@app.on_event("startup")
def startup():
    database.init_db()

class EnrollmentRequest(BaseModel):
    student_id: str
    course_offering_id: str

class EnrollmentResponse(BaseModel):
    id: str
    student_id: str
    course_offering_id: str
    status: str
    tenant_id: str

    class Config:
        orm_mode = True

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/enroll", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
def enroll_student(
    request: EnrollmentRequest, 
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    # Authorization: Only Tenant Admins or Admission Officers can enroll
    if "TENANT_ADMIN" not in user.roles and "ADMISSION_OFFICER" not in user.roles:
        raise HTTPException(status_code=403, detail="Not authorized to enroll students")

    # Business Logic: Check if already enrolled
    existing = db.query(database.Enrollment).filter(
        database.Enrollment.student_id == request.student_id,
        database.Enrollment.course_offering_id == request.course_offering_id,
        database.Enrollment.tenant_id == user.tenant_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Student already enrolled in this offering")

    new_enrollment = database.Enrollment(
        tenant_id=user.tenant_id,
        student_id=request.student_id,
        course_offering_id=request.course_offering_id
    )
    
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    
    import events
    events.emit_event('student.enrolled', {
        "enrollment_id": new_enrollment.id,
        "student_id": new_enrollment.student_id,
        "course_offering_id": new_enrollment.course_offering_id,
        "tenant_id": new_enrollment.tenant_id
    })
    
    return new_enrollment

@app.get("/student/{student_id}", response_model=List[EnrollmentResponse])
def get_student_enrollments(
    student_id: str,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    # Multitenancy Safety: Always filter by tenant_id
    enrollments = db.query(database.Enrollment).filter(
        database.Enrollment.student_id == student_id,
        database.Enrollment.tenant_id == user.tenant_id
    ).all()
    
    return enrollments
