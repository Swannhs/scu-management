from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, Date, UniqueConstraint, Index
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
import datetime
import uuid
from database import Base

# ==========================================
# ADMISSIONS / ENROLLMENT
# ==========================================

class IntakeTerm(Base):
    __tablename__ = "intake_terms"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False) # e.g. "Fall 2024 Intake"
    code = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True)

    # Configuration for the intake (programs open, quotas, etc.)
    config = Column(JSONB, nullable=True)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    __table_args__ = (
        UniqueConstraint('tenant_id', 'code', name='uq_intake_term_code'),
    )

class AdmissionApplication(Base):
    __tablename__ = "admission_applications"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)
    intake_id = Column(String, ForeignKey('intake_terms.id'), nullable=False)

    # Applicant details (before they become a Student)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)

    program_id = Column(String, nullable=False) # Reference to course-service:programs

    status = Column(String, default="DRAFT") # DRAFT, SUBMITTED, UNDER_REVIEW, ACCEPTED, REJECTED

    # Dynamic form data
    application_data = Column(JSONB, nullable=True)

    submitted_at = Column(DateTime, nullable=True)
    decision_at = Column(DateTime, nullable=True)
    decision_by = Column(String, nullable=True) # User ID
    decision_notes = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    intake = relationship("IntakeTerm")

    __table_args__ = (
        Index('idx_app_tenant_email', 'tenant_id', 'email'),
        Index('idx_app_tenant_status', 'tenant_id', 'status'),
    )

class ApplicationDocument(Base):
    __tablename__ = "application_documents"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)
    application_id = Column(String, ForeignKey('admission_applications.id'), nullable=False)

    document_type = Column(String, nullable=False) # Transcript, ID, etc.
    file_url = Column(String, nullable=False)
    is_verified = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True) # Added for consistency

    application = relationship("AdmissionApplication")

# ==========================================
# EVENT OUTBOX
# ==========================================

class EventOutbox(Base):
    __tablename__ = "event_outbox"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)
    event_type = Column(String, nullable=False)
    payload = Column(JSONB, nullable=False)

    status = Column(String, default="PENDING") # PENDING, PUBLISHED, FAILED
    retries = Column(JSONB, default=0)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
