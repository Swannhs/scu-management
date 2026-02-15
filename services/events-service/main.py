from datetime import datetime
from typing import Any, Dict, List, Literal, Optional
from uuid import uuid4

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

app = FastAPI(title="Events Service", version="1.0.0")
EVENTS: Dict[str, Dict[str, Any]] = {}
REGISTRATIONS: Dict[str, set[str]] = {}


def parse_auth(authorization: Optional[str]):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail={"code": "UNAUTHORIZED", "message": "Invalid token", "details": None})
    token = authorization.replace("Bearer ", "", 1)
    parts = token.split("|")
    if len(parts) < 3:
        raise HTTPException(status_code=401, detail={"code": "UNAUTHORIZED", "message": "Invalid token", "details": None})
    user_id, tenant_id, roles = parts[0], parts[1], parts[2]
    return {"user_id": user_id, "tenant_id": tenant_id, "roles": roles.split(",")}


def ok(data: Any, request_id: str):
    return {"success": True, "data": data, "meta": {"requestId": request_id, "timestamp": datetime.utcnow().isoformat()}}


def fail(code: str, message: str, details: Any, request_id: str):
    return {"success": False, "error": {"code": code, "message": message, "details": details}, "meta": {"requestId": request_id, "timestamp": datetime.utcnow().isoformat()}}


@app.middleware("http")
async def envelope_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid4()))
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response


@app.exception_handler(HTTPException)
async def http_exc(request: Request, exc: HTTPException):
    if isinstance(exc.detail, dict) and "code" in exc.detail:
        payload = fail(exc.detail["code"], exc.detail["message"], exc.detail.get("details"), request.state.request_id)
    else:
        payload = fail("REQUEST_FAILED", str(exc.detail), None, request.state.request_id)
    return JSONResponse(status_code=exc.status_code, content=payload)


@app.exception_handler(RequestValidationError)
async def validation_exc(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=400, content=fail("VALIDATION_ERROR", "Validation failed", exc.errors(), request.state.request_id))


class EventCreate(BaseModel):
    title: str = Field(min_length=3)
    description: Optional[str] = None
    starts_at: datetime
    ends_at: datetime
    type: Literal["cultural", "sports", "seminar", "workshop", "competition", "general"] = "general"
    visibility: Literal["public", "private"] = "public"


class EventPatch(BaseModel):
    title: Optional[str] = Field(default=None, min_length=3)
    description: Optional[str] = None
    status: Optional[Literal["draft", "published", "cancelled"]] = None


def auth_ctx(x_tenant_id: str, authorization: Optional[str]):
    if not x_tenant_id:
        raise HTTPException(status_code=400, detail={"code": "TENANT_HEADER_REQUIRED", "message": "X-Tenant-ID header is required", "details": None})
    user = parse_auth(authorization)
    if "SUPER_ADMIN" not in user["roles"] and user["tenant_id"] != x_tenant_id:
        raise HTTPException(status_code=403, detail={"code": "TENANT_CONTEXT_MISMATCH", "message": "Tenant mismatch", "details": None})
    return user


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/v1/events")
def create_event(payload: EventCreate, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    user = auth_ctx(x_tenant_id, authorization)
    if not any(r in user["roles"] for r in ["TENANT_ADMIN", "TEACHER", "SUPER_ADMIN"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Insufficient role", "details": None})
    eid = str(uuid4())
    EVENTS[eid] = {"id": eid, "tenant_id": x_tenant_id, "status": "draft", **payload.model_dump()}
    REGISTRATIONS[eid] = set()
    return ok(EVENTS[eid], request.state.request_id)


@app.get("/v1/events")
def list_events(request: Request, from_: Optional[datetime] = None, to: Optional[datetime] = None, type: Optional[str] = None, status: Optional[str] = None, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    auth_ctx(x_tenant_id, authorization)
    records = [e for e in EVENTS.values() if e["tenant_id"] == x_tenant_id]
    if from_:
        records = [e for e in records if e["starts_at"] >= from_]
    if to:
        records = [e for e in records if e["ends_at"] <= to]
    if type:
        records = [e for e in records if e["type"] == type]
    if status:
        records = [e for e in records if e["status"] == status]
    return ok(records, request.state.request_id)

@app.get("/v1/events/{event_id}")
def get_event(event_id: str, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    auth_ctx(x_tenant_id, authorization)
    ev = EVENTS.get(event_id)
    if not ev or ev["tenant_id"] != x_tenant_id:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Event not found", "details": None})
    return ok(ev, request.state.request_id)

@app.patch("/v1/events/{event_id}")
def patch_event(event_id: str, payload: EventPatch, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    user = auth_ctx(x_tenant_id, authorization)
    if not any(r in user["roles"] for r in ["TENANT_ADMIN", "TEACHER", "SUPER_ADMIN"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Insufficient role", "details": None})
    ev = EVENTS.get(event_id)
    if not ev or ev["tenant_id"] != x_tenant_id:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Event not found", "details": None})
    ev.update({k:v for k,v in payload.model_dump().items() if v is not None})
    return ok(ev, request.state.request_id)

@app.delete("/v1/events/{event_id}")
def delete_event(event_id: str, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    user = auth_ctx(x_tenant_id, authorization)
    if not any(r in user["roles"] for r in ["TENANT_ADMIN", "TEACHER", "SUPER_ADMIN"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Insufficient role", "details": None})
    ev = EVENTS.pop(event_id, None)
    REGISTRATIONS.pop(event_id, None)
    if not ev:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Event not found", "details": None})
    return ok({"deleted": True}, request.state.request_id)

@app.post("/v1/events/{event_id}/publish")
def publish_event(event_id: str, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    user = auth_ctx(x_tenant_id, authorization)
    if not any(r in user["roles"] for r in ["TENANT_ADMIN", "TEACHER", "SUPER_ADMIN"]):
        raise HTTPException(status_code=403, detail={"code": "FORBIDDEN", "message": "Insufficient role", "details": None})
    ev = EVENTS.get(event_id)
    if not ev:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Event not found", "details": None})
    ev["status"] = "published"
    return ok(ev, request.state.request_id)

@app.post("/v1/events/{event_id}/register")
def register(event_id: str, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    user = auth_ctx(x_tenant_id, authorization)
    if event_id not in EVENTS:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "Event not found", "details": None})
    REGISTRATIONS[event_id].add(user["user_id"])
    return ok({"registered": True}, request.state.request_id)

@app.post("/v1/events/{event_id}/unregister")
def unregister(event_id: str, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    user = auth_ctx(x_tenant_id, authorization)
    REGISTRATIONS.get(event_id, set()).discard(user["user_id"])
    return ok({"registered": False}, request.state.request_id)

@app.get("/v1/events/{event_id}/participants")
def participants(event_id: str, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    auth_ctx(x_tenant_id, authorization)
    return ok(sorted(list(REGISTRATIONS.get(event_id, set()))), request.state.request_id)

@app.post("/v1/events/{event_id}/check-in")
def checkin(event_id: str, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    user = auth_ctx(x_tenant_id, authorization)
    if user["user_id"] not in REGISTRATIONS.get(event_id, set()):
        raise HTTPException(status_code=400, detail={"code": "NOT_REGISTERED", "message": "User not registered", "details": None})
    return ok({"checkedIn": True}, request.state.request_id)

@app.get("/v1/calendar")
def calendar(month: int, year: int, request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    auth_ctx(x_tenant_id, authorization)
    results = [e for e in EVENTS.values() if e['tenant_id']==x_tenant_id and e['starts_at'].month==month and e['starts_at'].year==year]
    return ok(results, request.state.request_id)

@app.get("/v1/activities/me")
def my_activities(request: Request, x_tenant_id: str = Header(alias="X-Tenant-ID"), authorization: Optional[str] = Header(default=None, alias="Authorization")):
    user = auth_ctx(x_tenant_id, authorization)
    result=[EVENTS[eid] for eid,users in REGISTRATIONS.items() if user['user_id'] in users and eid in EVENTS]
    return ok(result, request.state.request_id)
