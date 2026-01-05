import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://enrollmentuser:enrollmentpass@enrollment-db:5432/enrollmentdb")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    # In production, use Alembic. For MVP startup, this creates tables.
    # Import models here to ensure they are registered with Base
    from models import IntakeTerm, AdmissionApplication, ApplicationDocument
    Base.metadata.create_all(bind=engine)
