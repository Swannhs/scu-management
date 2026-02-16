from datetime import datetime
from typing import Any, Dict, Optional
from uuid import uuid4
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, Field
app = FastAPI(title='Awards Service')
AWARDS: Dict[str, Dict[str, Any]] = {}
CERTS: Dict[str, Dict[str, Any]] = {}
def ok(data,rid): return {"success":True,"data":data,"meta":{"requestId":rid,"timestamp":datetime.utcnow().isoformat()}}
def err(code,msg,details,rid): return {"success":False,"error":{"code":code,"message":msg,"details":details},"meta":{"requestId":rid,"timestamp":datetime.utcnow().isoformat()}}
def auth(x_tenant_id, authorization):
    if not x_tenant_id: raise HTTPException(status_code=400, detail={"code":"TENANT_HEADER_REQUIRED","message":"X-Tenant-ID header is required","details":None})
    if not authorization or not authorization.startswith('Bearer '): raise HTTPException(status_code=401, detail={"code":"UNAUTHORIZED","message":"Invalid token","details":None})
    user_id, tenant_id, roles = authorization[7:].split('|'); roles=roles.split(',')
    if 'SUPER_ADMIN' not in roles and tenant_id!=x_tenant_id: raise HTTPException(status_code=403, detail={"code":"TENANT_CONTEXT_MISMATCH","message":"Tenant mismatch","details":None})
    return user_id, roles
@app.middleware('http')
async def mid(request:Request, call_next): request.state.rid=request.headers.get('X-Request-ID',str(uuid4())); return await call_next(request)
@app.exception_handler(HTTPException)
async def eh(request,exc): return JSONResponse(status_code=exc.status_code,content=err(exc.detail.get('code','REQUEST_FAILED'),exc.detail.get('message',str(exc.detail)),exc.detail.get('details'),request.state.rid))
@app.exception_handler(RequestValidationError)
async def vh(request,exc): return JSONResponse(status_code=400,content=err('VALIDATION_ERROR','Validation failed',exc.errors(),request.state.rid))
class Award(BaseModel): name:str=Field(min_length=2); description:Optional[str]=None
class Nom(BaseModel): studentId:str
@app.post('/v1/awards')
def create(payload:Award,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    _,roles=auth(x_tenant_id,authorization)
    if 'TENANT_ADMIN' not in roles and 'SUPER_ADMIN' not in roles: raise HTTPException(status_code=403,detail={"code":"FORBIDDEN","message":"Insufficient role","details":None})
    aid=str(uuid4()); AWARDS[aid]={"id":aid,"tenant_id":x_tenant_id,"status":"open","nominees":[],**payload.model_dump()}; return ok(AWARDS[aid],request.state.rid)
@app.get('/v1/awards')
def list(request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); return ok([a for a in AWARDS.values() if a['tenant_id']==x_tenant_id],request.state.rid)
@app.post('/v1/awards/{award_id}/nominate')
def nominate(award_id:str,payload:Nom,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); AWARDS[award_id]['nominees'].append(payload.studentId); return ok({'nominated':True},request.state.rid)
@app.post('/v1/awards/{award_id}/approve')
def approve(award_id:str,payload:Nom,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    _,roles=auth(x_tenant_id,authorization)
    if 'TENANT_ADMIN' not in roles and 'SUPER_ADMIN' not in roles: raise HTTPException(status_code=403,detail={"code":"FORBIDDEN","message":"Insufficient role","details":None})
    AWARDS[award_id]['approved_student']=payload.studentId; AWARDS[award_id]['status']='approved'; return ok(AWARDS[award_id],request.state.rid)
@app.post('/v1/awards/{award_id}/issue-certificate')
def issue(award_id:str,payload:Nom,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); cid=str(uuid4()); CERTS[cid]={"id":cid,"awardId":award_id,"studentId":payload.studentId,"url":f'https://object.local/certs/{cid}.pdf'}; return ok(CERTS[cid],request.state.rid)
@app.get('/v1/certificates/{certificate_id}')
def cert(certificate_id:str,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); return ok(CERTS.get(certificate_id),request.state.rid)
@app.get('/v1/students/{student_id}/achievements')
def ach(student_id:str,request:Request,x_tenant_id:str=Header(alias='X-Tenant-ID'),authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(x_tenant_id,authorization); return ok([c for c in CERTS.values() if c['studentId']==student_id],request.state.rid)
