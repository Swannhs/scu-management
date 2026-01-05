from sqlalchemy import Column, String, DateTime, JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.dialects.postgresql import JSONB
import datetime
import uuid

Base = declarative_base()

# ==========================================
# AUDIT LOGGING
# ==========================================

class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)

    event_id = Column(String, unique=True, nullable=False) # Correlation ID
    occurred_at = Column(DateTime, default=datetime.datetime.utcnow)

    actor_id = Column(String, nullable=True) # User ID who performed action
    actor_role = Column(String, nullable=True)

    action = Column(String, nullable=False) # CREATE, UPDATE, DELETE, LOGIN
    resource = Column(String, nullable=False) # e.g. "student", "invoice"
    resource_id = Column(String, nullable=True)

    old_values = Column(JSONB, nullable=True)
    new_values = Column(JSONB, nullable=True)
    metadata = Column(JSONB, nullable=True) # IP, User Agent, etc.

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
