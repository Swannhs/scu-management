from datetime import datetime
from typing import Any, Optional
from uuid import uuid4

from fastapi import Depends, FastAPI, Header, HTTPException, Query, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

import database
from models import Base, Notification, NotificationPreference

app = FastAPI(title="Notifications Service", version="1.0.0")


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=database.engine)


@app.middleware("http")
async def request_id_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid4()))
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response


def fail(code: str, message: str, details: Any, request_id: str):
    return {
        "error": {"code": code, "message": message, "details": details},
        "meta": {"requestId": request_id, "timestamp": datetime.utcnow().isoformat()},
    }


@app.exception_handler(HTTPException)
async def http_exc(request: Request, exc: HTTPException):
    if isinstance(exc.detail, dict) and "code" in exc.detail:
        payload = fail(
            exc.detail["code"],
            exc.detail.get("message", "Request failed"),
            exc.detail.get("details"),
            request.state.request_id,
        )
    else:
        payload = fail("REQUEST_FAILED", str(exc.detail), None, request.state.request_id)
    return JSONResponse(status_code=exc.status_code, content=payload)


@app.exception_handler(RequestValidationError)
async def validation_exc(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content=fail("VALIDATION_ERROR", "Validation failed", exc.errors(), request.state.request_id),
    )


def ok(data: Any, message: str = "Success"):
    return {"data": data, "message": message}


def list_ok(data: list[Any], page: int, limit: int, total: int):
    return {"data": data, "meta": {"page": page, "limit": limit, "total": total}}


def parse_auth(authorization: Optional[str]):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail={"code": "UNAUTHORIZED", "message": "Invalid token", "details": None})
    token = authorization.replace("Bearer ", "", 1)
    parts = token.split("|")
    if len(parts) < 3:
        raise HTTPException(status_code=401, detail={"code": "UNAUTHORIZED", "message": "Invalid token", "details": None})
    return {"user_id": parts[0], "tenant_id": parts[1], "roles": parts[2].split(",")}


def auth_ctx(x_tenant_id: str, authorization: Optional[str]):
    if not x_tenant_id:
        raise HTTPException(status_code=400, detail={"code": "TENANT_HEADER_REQUIRED", "message": "X-Tenant-ID header is required", "details": None})
    user = parse_auth(authorization)
    if "SUPER_ADMIN" not in user["roles"] and user["tenant_id"] != x_tenant_id:
        raise HTTPException(status_code=403, detail={"code": "TENANT_CONTEXT_MISMATCH", "message": "Tenant mismatch", "details": None})
    return user


def require_roles(user: dict, allowed_roles: list[str]):
    if not any(role in user["roles"] for role in allowed_roles):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Insufficient role", "details": None})


class NotificationCreate(BaseModel):
    recipientId: str = Field(min_length=1)
    type: str = Field(min_length=1)
    title: str = Field(min_length=1)
    body: str = Field(min_length=1)
    link: Optional[str] = None
    metadata: Optional[dict[str, Any]] = None


class NotificationPreferencePatch(BaseModel):
    emailEnabled: Optional[bool] = None
    smsEnabled: Optional[bool] = None
    pushEnabled: Optional[bool] = None
    inAppEnabled: Optional[bool] = None
    mutedTypes: Optional[list[str]] = None


def notification_to_response(record: Notification):
    return {
        "id": record.id,
        "recipientId": record.recipient_id,
        "tenantId": record.tenant_id,
        "type": record.type,
        "title": record.title,
        "body": record.body,
        "link": record.link,
        "metadata": record.metadata,
        "readAt": record.read_at.isoformat() if record.read_at else None,
        "createdAt": record.created_at.isoformat() if record.created_at else None,
        "updatedAt": record.updated_at.isoformat() if record.updated_at else None,
    }


def preference_to_response(record: NotificationPreference):
    return {
        "emailEnabled": record.email_enabled,
        "smsEnabled": record.sms_enabled,
        "pushEnabled": record.push_enabled,
        "inAppEnabled": record.in_app_enabled,
        "mutedTypes": record.muted_types or [],
    }


@app.get("/")
def read_root():
    return {"message": "Hello from Notifications Service"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/ready")
def ready():
    db = database.SessionLocal()
    try:
        from sqlalchemy import text

        db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception:
        return JSONResponse(status_code=503, content={"status": "error", "detail": "Database not ready"})
    finally:
        db.close()


@app.get("/v1/notifications")
def list_notifications(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    unreadOnly: bool = Query(False),
    db: Session = Depends(database.get_db),
    x_tenant_id: str = Header(alias="X-Tenant-ID"),
    authorization: Optional[str] = Header(default=None, alias="Authorization"),
):
    user = auth_ctx(x_tenant_id, authorization)
    query = db.query(Notification).filter(Notification.tenant_id == x_tenant_id, Notification.recipient_id == user["user_id"])
    if unreadOnly:
        query = query.filter(Notification.read_at.is_(None))
    total = query.count()
    records = query.order_by(Notification.created_at.desc()).offset((page - 1) * limit).limit(limit).all()
    return list_ok([notification_to_response(row) for row in records], page, limit, total)


@app.get("/v1/notifications/me")
def list_my_notifications(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    unreadOnly: bool = Query(False),
    db: Session = Depends(database.get_db),
    x_tenant_id: str = Header(alias="X-Tenant-ID"),
    authorization: Optional[str] = Header(default=None, alias="Authorization"),
):
    return list_notifications(page, limit, unreadOnly, db, x_tenant_id, authorization)


@app.post("/v1/notifications")
def create_notification(
    payload: NotificationCreate,
    db: Session = Depends(database.get_db),
    x_tenant_id: str = Header(alias="X-Tenant-ID"),
    authorization: Optional[str] = Header(default=None, alias="Authorization"),
):
    user = auth_ctx(x_tenant_id, authorization)
    require_roles(user, ["SUPER_ADMIN", "TENANT_ADMIN", "STAFF", "FACULTY", "SYSTEM"])

    notification = Notification(
        tenant_id=x_tenant_id,
        recipient_id=payload.recipientId,
        type=payload.type,
        title=payload.title,
        body=payload.body,
        link=payload.link,
        metadata=payload.metadata,
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return ok(notification_to_response(notification), "Created")


@app.get("/v1/notifications/{notification_id}")
def get_notification(
    notification_id: str,
    db: Session = Depends(database.get_db),
    x_tenant_id: str = Header(alias="X-Tenant-ID"),
    authorization: Optional[str] = Header(default=None, alias="Authorization"),
):
    user = auth_ctx(x_tenant_id, authorization)
    record = db.query(Notification).filter(Notification.id == notification_id, Notification.tenant_id == x_tenant_id).first()
    if not record:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Notification not found", "details": None})

    can_view_any = any(role in user["roles"] for role in ["SUPER_ADMIN", "TENANT_ADMIN", "STAFF", "FACULTY"])
    if record.recipient_id != user["user_id"] and not can_view_any:
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Insufficient role", "details": None})

    return ok(notification_to_response(record))


@app.patch("/v1/notifications/{notification_id}/read")
def mark_read(
    notification_id: str,
    db: Session = Depends(database.get_db),
    x_tenant_id: str = Header(alias="X-Tenant-ID"),
    authorization: Optional[str] = Header(default=None, alias="Authorization"),
):
    user = auth_ctx(x_tenant_id, authorization)
    record = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.tenant_id == x_tenant_id,
        Notification.recipient_id == user["user_id"],
    ).first()
    if not record:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Notification not found", "details": None})

    if record.read_at is None:
        record.read_at = datetime.utcnow()
        db.add(record)
        db.commit()
        db.refresh(record)

    return ok(notification_to_response(record))


@app.patch("/v1/notifications/read-all")
def mark_all_read(
    db: Session = Depends(database.get_db),
    x_tenant_id: str = Header(alias="X-Tenant-ID"),
    authorization: Optional[str] = Header(default=None, alias="Authorization"),
):
    user = auth_ctx(x_tenant_id, authorization)
    now = datetime.utcnow()
    count = db.query(Notification).filter(
        Notification.tenant_id == x_tenant_id,
        Notification.recipient_id == user["user_id"],
        Notification.read_at.is_(None),
    ).update({Notification.read_at: now}, synchronize_session=False)
    db.commit()
    return ok({"updated": count})


@app.get("/v1/notification-preferences/me")
def get_my_preferences(
    db: Session = Depends(database.get_db),
    x_tenant_id: str = Header(alias="X-Tenant-ID"),
    authorization: Optional[str] = Header(default=None, alias="Authorization"),
):
    user = auth_ctx(x_tenant_id, authorization)
    pref = db.query(NotificationPreference).filter(
        NotificationPreference.tenant_id == x_tenant_id,
        NotificationPreference.user_id == user["user_id"],
    ).first()
    if not pref:
        pref = NotificationPreference(tenant_id=x_tenant_id, user_id=user["user_id"])
        db.add(pref)
        db.commit()
        db.refresh(pref)
    return ok(preference_to_response(pref))


@app.patch("/v1/notification-preferences/me")
def patch_my_preferences(
    payload: NotificationPreferencePatch,
    db: Session = Depends(database.get_db),
    x_tenant_id: str = Header(alias="X-Tenant-ID"),
    authorization: Optional[str] = Header(default=None, alias="Authorization"),
):
    user = auth_ctx(x_tenant_id, authorization)
    pref = db.query(NotificationPreference).filter(
        NotificationPreference.tenant_id == x_tenant_id,
        NotificationPreference.user_id == user["user_id"],
    ).first()
    if not pref:
        pref = NotificationPreference(tenant_id=x_tenant_id, user_id=user["user_id"])

    data = payload.model_dump(exclude_unset=True)
    if "emailEnabled" in data:
        pref.email_enabled = data["emailEnabled"]
    if "smsEnabled" in data:
        pref.sms_enabled = data["smsEnabled"]
    if "pushEnabled" in data:
        pref.push_enabled = data["pushEnabled"]
    if "inAppEnabled" in data:
        pref.in_app_enabled = data["inAppEnabled"]
    if "mutedTypes" in data:
        pref.muted_types = data["mutedTypes"]

    db.add(pref)
    db.commit()
    db.refresh(pref)
    return ok(preference_to_response(pref))
