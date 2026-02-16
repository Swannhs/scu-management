from datetime import datetime
from typing import Any, Dict, Optional
from uuid import uuid4
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, Field

app = FastAPI(title="Clubs Service")
CLUBS: Dict[str, Dict[str, Any]] = {}
MEMBERS: Dict[str, Dict[str, str]] = {}

def auth(x_tenant_id, authorization):
    if not x_tenant_id:
        raise HTTPException(status_code=400, detail={"code":"TENANT_HEADER_REQUIRED","message":"X-Tenant-ID header is required","details":None})
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail={"code":"UNAUTHORIZED","message":"Invalid token","details":None})
    user_id, tenant_id, roles = authorization[7:].split("|")
    roles = roles.split(",")
    if "SUPER_ADMIN" not in roles and tenant_id != x_tenant_id:
        raise HTTPException(status_code=403, detail={"code":"TENANT_CONTEXT_MISMATCH","message":"Tenant mismatch","details":None})
    return user_id, roles

def ok(data,rid): return {"success":True,"data":data,"meta":{"requestId":rid,"timestamp":datetime.utcnow().isoformat()}}
def err(code,msg,details,rid): return {"success":False,"error":{"code":code,"message":msg,"details":details},"meta":{"requestId":rid,"timestamp":datetime.utcnow().isoformat()}}
@app.middleware("http")
async def rid(request: Request, call_next):
    request.state.rid = request.headers.get("X-Request-ID", str(uuid4())); return await call_next(request)
@app.exception_handler(HTTPException)
async def h(request, exc): return JSONResponse(status_code=exc.status_code, content=err(exc.detail.get('code','REQUEST_FAILED'),exc.detail.get('message',str(exc.detail)),exc.detail.get('details'), request.state.rid))
@app.exception_handler(RequestValidationError)
async def v(request, exc): return JSONResponse(status_code=400, content=err('VALIDATION_ERROR','Validation failed',exc.errors(),request.state.rid))
class Club(BaseModel): name:str=Field(min_length=2); category:str; description:Optional[str]=None
class ClubPatch(BaseModel): name:Optional[str]=Field(default=None,min_length=2); category:Optional[str]=None; description:Optional[str]=None
@app.post('/v1/clubs')
def create(payload:Club, request:Request, x_tenant_id:str=Header(alias='X-Tenant-ID'), authorization:Optional[str]=Header(default=None,alias='Authorization')):
    uid,roles=auth(x_tenant_id,authorization)
    if 'TENANT_ADMIN' not in roles and 'TEACHER' not in roles and 'SUPER_ADMIN' not in roles: raise HTTPException(status_code=403,detail={"code":"FORBIDDEN","message":"Insufficient role","details":None})
    cid=str(uuid4()); CLUBS[cid]={"id":cid,"tenant_id":x_tenant_id,**payload.model_dump()}; MEMBERS[cid]={uid:'OWNER'}; return ok(CLUBS[cid],request.state.rid)
@app.get('/v1/clubs')
def list(query:Optional[str]=None, category:Optional[str]=None, request:Request=None, x_tenant_id:str=Header(alias='X-Tenant-ID'), authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); rows=[c for c in CLUBS.values() if c['tenant_id']==x_tenant_id];
    if query: rows=[c for c in rows if query.lower() in c['name'].lower()]
    if category: rows=[c for c in rows if c['category']==category]
    return ok(rows,request.state.rid)
@app.get('/v1/clubs/{club_id}')
def get(club_id:str, request:Request, x_tenant_id:str=Header(alias='X-Tenant-ID'), authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); c=CLUBS.get(club_id); 
    if not c: raise HTTPException(status_code=404,detail={"code":"NOT_FOUND","message":"Club not found","details":None})
    return ok(c,request.state.rid)
@app.patch('/v1/clubs/{club_id}')
def patch(club_id:str,payload:ClubPatch,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    _,roles=auth(x_tenant_id,authorization)
    if 'TENANT_ADMIN' not in roles and 'SUPER_ADMIN' not in roles: raise HTTPException(status_code=403,detail={"code":"FORBIDDEN","message":"Insufficient role","details":None})
    c=CLUBS.get(club_id); 
    if not c: raise HTTPException(status_code=404,detail={"code":"NOT_FOUND","message":"Club not found","details":None})
    c.update({k:v for k,v in payload.model_dump().items() if v is not None}); return ok(c,request.state.rid)
@app.post('/v1/clubs/{club_id}/join')
def join(club_id:str,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    uid,_=auth(x_tenant_id,authorization); MEMBERS.setdefault(club_id,{})[uid]='MEMBER'; return ok({'joined':True},request.state.rid)
@app.post('/v1/clubs/{club_id}/leave')
def leave(club_id:str,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    uid,_=auth(x_tenant_id,authorization); MEMBERS.setdefault(club_id,{}).pop(uid,None); return ok({'joined':False},request.state.rid)
@app.get('/v1/clubs/{club_id}/members')
def members(club_id:str,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); return ok([{'userId':u,'role':r} for u,r in MEMBERS.get(club_id,{}).items()],request.state.rid)
class RolePatch(BaseModel): role:str
@app.patch('/v1/clubs/{club_id}/members/{user_id}')
def role(club_id:str,user_id:str,payload:RolePatch,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    _,roles=auth(x_tenant_id,authorization)
    if 'TENANT_ADMIN' not in roles and 'SUPER_ADMIN' not in roles: raise HTTPException(status_code=403,detail={"code":"FORBIDDEN","message":"Insufficient role","details":None})
    MEMBERS.setdefault(club_id,{})[user_id]=payload.role; return ok({'userId':user_id,'role':payload.role},request.state.rid)
class ClubEvent(BaseModel): eventId:str
@app.post('/v1/clubs/{club_id}/events')
def event(club_id:str,payload:ClubEvent,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); return ok({'clubId':club_id,'eventId':payload.eventId,'linked':True},request.state.rid)
