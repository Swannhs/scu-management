import os
from sqlalchemy import create_all, Column, String, DateTime, Enum, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import datetime
import uuid

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://enrollmentuser:enrollmentpass@enrollment-db:5432/enrollmentdb")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, index=True, nullable=False)
    student_id = Column(String, index=True, nullable=False)
    course_offering_id = Column(String, index=True, nullable=False)
    status = Column(String, default="ENROLLED") # ENROLLED, COMPLETED, DROPPED
    enrolled_at = Column(DateTime, default=datetime.datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
