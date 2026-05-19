from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, JSON, Enum, Text
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.dialects.postgresql import UUID, JSONB
import datetime
import uuid

Base = declarative_base()

# ==========================================
# NOTIFICATIONS
# ==========================================

class NotificationTemplate(Base):
    __tablename__ = "notification_templates"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)

    code = Column(String, nullable=False) # e.g. "STUDENT_WELCOME"
    channel = Column(String, default="EMAIL") # EMAIL, SMS, PUSH, IN_APP

    subject_template = Column(String, nullable=True)
    body_template = Column(Text, nullable=False) # Handlebars/Jinja syntax

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class NotificationOutbox(Base):
    __tablename__ = "notification_outbox"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)

    event_type = Column(String, nullable=False)
    recipient = Column(String, nullable=False) # Email or Phone
    recipient_id = Column(String, nullable=True) # User ID

    template_code = Column(String, nullable=True)
    payload = Column(JSONB, nullable=True)

    status = Column(String, default="PENDING") # PENDING, SENT, FAILED, RETRY
    error_log = Column(Text, nullable=True)

    retries = Column(JSONB, default=0)
    scheduled_at = Column(DateTime, default=datetime.datetime.utcnow)
    sent_at = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    recipient_id = Column(String, nullable=False, index=True)
    tenant_id = Column(String, nullable=False, index=True)
    type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    link = Column(String, nullable=True)
    metadata = Column(JSONB, nullable=True)
    read_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class NotificationPreference(Base):
    __tablename__ = "notification_preferences"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=False, index=True)
    tenant_id = Column(String, nullable=False, index=True)
    email_enabled = Column(Boolean, default=True)
    sms_enabled = Column(Boolean, default=False)
    push_enabled = Column(Boolean, default=True)
    in_app_enabled = Column(Boolean, default=True)
    muted_types = Column(JSONB, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
