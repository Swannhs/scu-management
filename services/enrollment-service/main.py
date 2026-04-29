from datetime import datetime, date
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

import auth
import database
from models import IntakeTerm, AdmissionApplication, ApplicationDocument, Student, Enrollment
import events

app = FastAPI(title="Enrollment Service")

# Initialize database tables and outbox worker
@app.on_event("startup")
def startup():
    database.init_db()
    events.start_outbox_worker()

@app.exception_handler(HTTPException)
def http_exception_handler(request, exc: HTTPException):
    if isinstance(exc.detail, dict) and "code" in exc.detail:
        return JSONResponse(status_code=exc.status_code, content=exc.detail)
    return JSONResponse(status_code=exc.status_code, content={
        "code": "REQUEST_FAILED",
        "message": str(exc.detail),
        "details": None
    })

class IntakeTermRequest(BaseModel):
    name: str
    code: str
    start_date: date
    end_date: date
    config: Optional[dict] = None

class IntakeTermResponse(BaseModel):
    id: str
    tenant_id: str
    name: str
    code: str
    start_date: date
    end_date: date
    is_active: bool
    config: Optional[dict]

    class Config:
        orm_mode = True

class ApplicationCreateRequest(BaseModel):
    intake_id: str
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    program_id: str
    application_data: Optional[dict] = None

class ApplicationStatusRequest(BaseModel):
    status: str = Field(..., pattern="^(ACCEPTED|REJECTED|UNDER_REVIEW)$")
    decision_notes: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: str
    tenant_id: str
    intake_id: str
    first_name: str
    last_name: str
    email: str
    phone: Optional[str]
    program_id: str
    status: str
    application_data: Optional[dict]
    submitted_at: Optional[datetime]
    decision_at: Optional[datetime]
    decision_by: Optional[str]
    decision_notes: Optional[str]

    class Config:
        orm_mode = True

class ApplicationDocumentRequest(BaseModel):
    docType: str
    fileId: str

class ApplicationDocumentResponse(BaseModel):
    id: str
    tenant_id: str
    application_id: str
    document_type: str
    file_id: str
    is_verified: bool

    class Config:
        orm_mode = True

class EnrollmentRequest(BaseModel):
    studentId: str
    sectionId: str
    capacity: Optional[int] = None

class EnrollmentResponse(BaseModel):
    id: str
    studentId: str = Field(..., alias="student_id")
    sectionId: str = Field(..., alias="offering_id")
    status: str
    tenantId: str = Field(..., alias="tenant_id")

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

class StudentCreateRequest(BaseModel):
    userId: str
    firstName: str
    lastName: str
    email: str
    phone: Optional[str] = None
    programId: str

class StudentResponse(BaseModel):
    id: str
    tenantId: str = Field(..., alias="tenant_id")
    userId: str = Field(..., alias="user_id")
    firstName: str = Field(..., alias="first_name")
    lastName: str = Field(..., alias="last_name")
    email: str
    phone: Optional[str]
    programId: str = Field(..., alias="program_id")
    status: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/ready")
def ready():
    db = database.SessionLocal()
    try:
        from sqlalchemy import text
        db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception:
        from fastapi.responses import JSONResponse
        return JSONResponse(status_code=503, content={"status": "error", "detail": "Database not ready"})
    finally:
        db.close()

def ensure_roles(user: auth.UserContext, required_roles: List[str]):
    if not any(role in user.roles for role in required_roles):
        raise HTTPException(
            status_code=403,
            detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None}
        )

def has_time_conflict(student_id: str, section_id: str) -> bool:
    # TODO: integrate with scheduling/sections to detect time conflicts
    return False

@app.post("/v1/intake-terms", response_model=IntakeTermResponse, status_code=status.HTTP_201_CREATED)
def create_intake_term(
    request: IntakeTermRequest,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    ensure_roles(user, ["TENANT_ADMIN"])

    intake = IntakeTerm(
        tenant_id=user.tenant_id,
        name=request.name,
        code=request.code,
        start_date=request.start_date,
        end_date=request.end_date,
        config=request.config
    )
    db.add(intake)
    db.commit()
    db.refresh(intake)
    return intake

@app.get("/v1/intake-terms", response_model=List[IntakeTermResponse])
def list_intake_terms(
    cursor: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    query = db.query(IntakeTerm).filter(IntakeTerm.tenant_id == user.tenant_id)
    if cursor:
        query = query.filter(IntakeTerm.created_at > datetime.fromisoformat(cursor))
    return query.order_by(IntakeTerm.created_at.asc()).limit(limit).all()

@app.post("/v1/applications", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_application(
    request: ApplicationCreateRequest,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    ensure_roles(user, ["STUDENT"])

    application = AdmissionApplication(
        tenant_id=user.tenant_id,
        intake_id=request.intake_id,
        user_id=user.user_id,
        first_name=request.first_name,
        last_name=request.last_name,
        email=request.email,
        phone=request.phone,
        program_id=request.program_id,
        status="SUBMITTED",
        application_data=request.application_data,
        submitted_at=datetime.utcnow()
    )
    db.add(application)
    db.flush()
    events.enqueue_event(db, user.tenant_id, "admission.application.submitted", {
        "applicationId": application.id,
        "userId": user.user_id,
        "tenantId": user.tenant_id,
        "programId": request.program_id
    })
    db.commit()
    db.refresh(application)
    return application

@app.get("/v1/applications/me", response_model=List[ApplicationResponse])
def list_my_applications(
    cursor: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    ensure_roles(user, ["STUDENT"])

    query = db.query(AdmissionApplication).filter(
        AdmissionApplication.tenant_id == user.tenant_id,
        AdmissionApplication.user_id == user.user_id
    )
    if cursor:
        query = query.filter(AdmissionApplication.created_at > datetime.fromisoformat(cursor))
    return query.order_by(AdmissionApplication.created_at.asc()).limit(limit).all()

@app.get("/v1/applications", response_model=List[ApplicationResponse])
def list_applications(
    status_filter: Optional[str] = Query(None, alias="status"),
    intake_term_id: Optional[str] = Query(None, alias="intakeTermId"),
    cursor: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if not any(role in user.roles for role in ["ADMISSION_OFFICER", "TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    query = db.query(AdmissionApplication).filter(AdmissionApplication.tenant_id == user.tenant_id)
    if status_filter:
        query = query.filter(AdmissionApplication.status == status_filter)
    if intake_term_id:
        query = query.filter(AdmissionApplication.intake_id == intake_term_id)
    if cursor:
        query = query.filter(AdmissionApplication.created_at > datetime.fromisoformat(cursor))
    return query.order_by(AdmissionApplication.created_at.asc()).limit(limit).all()

@app.patch("/v1/applications/{application_id}/status", response_model=ApplicationResponse)
def update_application_status(
    application_id: str,
    request: ApplicationStatusRequest,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if not any(role in user.roles for role in ["ADMISSION_OFFICER", "TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    application = db.query(AdmissionApplication).filter(
        AdmissionApplication.id == application_id,
        AdmissionApplication.tenant_id == user.tenant_id
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Application not found", "details": None})

    valid_transitions = {
        "SUBMITTED": {"UNDER_REVIEW", "ACCEPTED", "REJECTED"},
        "UNDER_REVIEW": {"ACCEPTED", "REJECTED"}
    }
    if application.status not in valid_transitions or request.status not in valid_transitions[application.status]:
        raise HTTPException(status_code=400, detail={"code": "INVALID_STATUS", "message": "Invalid status transition", "details": None})

    application.status = request.status
    application.decision_at = datetime.utcnow()
    application.decision_by = user.user_id
    application.decision_notes = request.decision_notes
    db.add(application)

    event_type = "admission.application.accepted" if request.status == "ACCEPTED" else "admission.application.rejected"
    events.enqueue_event(db, user.tenant_id, event_type, {
        "applicationId": application.id,
        "userId": application.user_id,
        "tenantId": user.tenant_id,
        "status": request.status,
        "programId": application.program_id,
        "profileFields": {
            "firstName": application.first_name,
            "lastName": application.last_name,
            "email": application.email,
            "phone": application.phone,
            "programId": application.program_id
        }
    })
    db.commit()
    db.refresh(application)
    return application

@app.post("/v1/applications/{application_id}/approve", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
def approve_application(
    application_id: str,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if not any(role in user.roles for role in ["TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    application = db.query(AdmissionApplication).filter(
        AdmissionApplication.id == application_id,
        AdmissionApplication.tenant_id == user.tenant_id
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Application not found", "details": None})

    if application.status not in {"SUBMITTED", "UNDER_REVIEW"}:
        raise HTTPException(status_code=400, detail={"code": "INVALID_STATUS", "message": "Application not in approvable state", "details": None})

    existing_student = db.query(Student).filter(
        Student.tenant_id == user.tenant_id,
        Student.user_id == application.user_id
    ).first()
    if existing_student:
        return existing_student

    application.status = "ACCEPTED"
    application.decision_at = datetime.utcnow()
    application.decision_by = user.user_id
    db.add(application)

    student = Student(
        tenant_id=user.tenant_id,
        user_id=application.user_id,
        first_name=application.first_name,
        last_name=application.last_name,
        email=application.email,
        phone=application.phone,
        program_id=application.program_id,
        status="ACTIVE"
    )
    db.add(student)
    db.flush()
    events.enqueue_event(db, user.tenant_id, "student.created", {
        "studentId": student.id,
        "tenantId": user.tenant_id,
        "userId": student.user_id,
        "programId": student.program_id
    })
    db.commit()
    db.refresh(student)
    return student

@app.post("/v1/students", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(
    request: StudentCreateRequest,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if not any(role in user.roles for role in ["TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    student = Student(
        tenant_id=user.tenant_id,
        user_id=request.userId,
        first_name=request.firstName,
        last_name=request.lastName,
        email=request.email,
        phone=request.phone,
        program_id=request.programId,
        status="ACTIVE"
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    return student

@app.get("/v1/students/me", response_model=StudentResponse)
def get_my_student_profile(
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if "STUDENT" not in user.roles:
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    student = db.query(Student).filter(
        Student.user_id == user.user_id,
        Student.tenant_id == user.tenant_id
    ).first()
    if not student:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Student not found", "details": None})
    return student

@app.get("/v1/students/{student_id}", response_model=StudentResponse)
def get_student(
    student_id: str,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if "STUDENT" in user.roles:
        student = db.query(Student).filter(
            Student.id == student_id,
            Student.user_id == user.user_id,
            Student.tenant_id == user.tenant_id
        ).first()
        if not student:
            raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Student not found", "details": None})
        return student

    if not any(role in user.roles for role in ["TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    student = db.query(Student).filter(
        Student.id == student_id,
        Student.tenant_id == user.tenant_id
    ).first()
    if not student:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Student not found", "details": None})
    return student

@app.get("/v1/students", response_model=List[StudentResponse])
def list_students(
    program_id: Optional[str] = Query(None, alias="programId"),
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if not any(role in user.roles for role in ["TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    query = db.query(Student).filter(Student.tenant_id == user.tenant_id)
    if program_id:
        query = query.filter(Student.program_id == program_id)
    return query.all()

@app.post("/v1/applications/{application_id}/documents", response_model=ApplicationDocumentResponse, status_code=status.HTTP_201_CREATED)
def add_application_document(
    application_id: str,
    request: ApplicationDocumentRequest,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    ensure_roles(user, ["STUDENT"])

    application = db.query(AdmissionApplication).filter(
        AdmissionApplication.id == application_id,
        AdmissionApplication.tenant_id == user.tenant_id
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Application not found", "details": None})

    document = ApplicationDocument(
        tenant_id=user.tenant_id,
        application_id=application_id,
        document_type=request.docType,
        file_id=request.fileId
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    return document

@app.patch("/v1/applications/{application_id}/documents/{doc_id}/verify", response_model=ApplicationDocumentResponse)
def verify_application_document(
    application_id: str,
    doc_id: str,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    ensure_roles(user, ["ADMISSION_OFFICER"])

    document = db.query(ApplicationDocument).filter(
        ApplicationDocument.id == doc_id,
        ApplicationDocument.application_id == application_id,
        ApplicationDocument.tenant_id == user.tenant_id
    ).first()
    if not document:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Document not found", "details": None})

    document.is_verified = True
    db.add(document)
    db.commit()
    db.refresh(document)
    return document

@app.post("/v1/enrollments", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
def enroll_student(
    request: EnrollmentRequest,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if not any(role in user.roles for role in ["TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    existing = db.query(Enrollment).filter(
        Enrollment.student_id == request.studentId,
        Enrollment.offering_id == request.sectionId,
        Enrollment.tenant_id == user.tenant_id,
        Enrollment.status == "ENROLLED"
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail={"code": "ALREADY_ENROLLED", "message": "Student already enrolled", "details": None})

    if request.capacity is not None:
        current_count = db.query(Enrollment).filter(
            Enrollment.offering_id == request.sectionId,
            Enrollment.tenant_id == user.tenant_id,
            Enrollment.status == "ENROLLED"
        ).count()
        if current_count >= request.capacity:
            raise HTTPException(status_code=409, detail={"code": "SECTION_FULL", "message": "No seats available", "details": None})

    if has_time_conflict(request.studentId, request.sectionId):
        raise HTTPException(status_code=409, detail={"code": "TIME_CONFLICT", "message": "Schedule conflict", "details": None})

    new_enrollment = Enrollment(
        tenant_id=user.tenant_id,
        student_id=request.studentId,
        offering_id=request.sectionId
    )
    db.add(new_enrollment)
    db.flush()
    events.enqueue_event(db, user.tenant_id, "student.enrolled", {
        "enrollmentId": new_enrollment.id,
        "studentId": new_enrollment.student_id,
        "sectionId": new_enrollment.offering_id,
        "tenantId": new_enrollment.tenant_id
    })
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment

@app.delete("/v1/enrollments/{enrollment_id}", response_model=EnrollmentResponse)
def drop_enrollment(
    enrollment_id: str,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if not any(role in user.roles for role in ["TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    enrollment = db.query(Enrollment).filter(
        Enrollment.id == enrollment_id,
        Enrollment.tenant_id == user.tenant_id
    ).first()
    if not enrollment:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Enrollment not found", "details": None})

    enrollment.status = "DROPPED"
    db.add(enrollment)
    events.enqueue_event(db, user.tenant_id, "student.dropped", {
        "enrollmentId": enrollment.id,
        "studentId": enrollment.student_id,
        "sectionId": enrollment.offering_id,
        "tenantId": enrollment.tenant_id
    })
    db.commit()
    db.refresh(enrollment)
    return enrollment

@app.get("/v1/students/{student_id}/enrollments", response_model=List[EnrollmentResponse])
def get_student_enrollments(
    student_id: str,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if "STUDENT" in user.roles and student_id != user.user_id:
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})
    if "STUDENT" not in user.roles and not any(role in user.roles for role in ["TENANT_ADMIN", "REGISTRAR"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    enrollments = db.query(Enrollment).filter(
        Enrollment.student_id == student_id,
        Enrollment.tenant_id == user.tenant_id
    ).all()
    return enrollments

@app.get("/v1/sections/{section_id}/roster", response_model=List[EnrollmentResponse])
def get_section_roster(
    section_id: str,
    db: Session = Depends(database.get_db),
    user: auth.UserContext = Depends(auth.get_user_context)
):
    if "FACULTY" not in user.roles and "TENANT_ADMIN" not in user.roles and "REGISTRAR" not in user.roles:
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Not authorized", "details": None})

    enrollments = db.query(Enrollment).filter(
        Enrollment.offering_id == section_id,
        Enrollment.tenant_id == user.tenant_id,
        Enrollment.status == "ENROLLED"
    ).all()
    return enrollments
