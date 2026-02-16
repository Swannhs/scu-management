from datetime import datetime
from typing import Any, Dict, Optional
from uuid import uuid4
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
app = FastAPI(title='Platform Admin Service')
TENANTS: Dict[str, Dict[str, Any]] = {}
PLANS: Dict[str, Dict[str, Any]] = {}
SUBS: Dict[str, Dict[str, Any]] = {}
INVOICES: Dict[str, list] = {}
FEATURES: Dict[str, Dict[str, bool]] = {}
def ok(data,rid): return {"success":True,"data":data,"meta":{"requestId":rid,"timestamp":datetime.utcnow().isoformat()}}
def err(code,msg,details,rid): return {"success":False,"error":{"code":code,"message":msg,"details":details},"meta":{"requestId":rid,"timestamp":datetime.utcnow().isoformat()}}
def auth(authorization):
    if not authorization or not authorization.startswith('Bearer '): raise HTTPException(status_code=401, detail={"code":"UNAUTHORIZED","message":"Invalid token","details":None})
    user_id, _tenant, roles = authorization[7:].split('|'); roles=roles.split(',')
    if 'SUPER_ADMIN' not in roles: raise HTTPException(status_code=403, detail={"code":"FORBIDDEN","message":"Super admin required","details":None})
    return user_id
@app.middleware('http')
async def m(request:Request, call_next): request.state.rid=request.headers.get('X-Request-ID',str(uuid4())); return await call_next(request)
@app.exception_handler(HTTPException)
async def he(request,exc): return JSONResponse(status_code=exc.status_code,content=err(exc.detail.get('code','REQUEST_FAILED'),exc.detail.get('message',str(exc.detail)),exc.detail.get('details'),request.state.rid))
@app.exception_handler(RequestValidationError)
async def ve(request,exc): return JSONResponse(status_code=400,content=err('VALIDATION_ERROR','Validation failed',exc.errors(),request.state.rid))
class Tenant(BaseModel): name:str; domain:str
class Plan(BaseModel): name:str; monthlyPrice:float
class Subscription(BaseModel): planId:str
class Invoice(BaseModel): amount:float; dueDate:str
class FeaturePatch(BaseModel): features:Dict[str,bool]
@app.post('/v1/tenants')
def tcreate(payload:Tenant,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')):
    auth(authorization); tid=str(uuid4()); TENANTS[tid]={"id":tid,"status":"active",**payload.model_dump()}; FEATURES[tid]={}; return ok(TENANTS[tid],request.state.rid)
@app.get('/v1/tenants')
def tlist(request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); return ok(list(TENANTS.values()),request.state.rid)
@app.get('/v1/tenants/{tenant_id}')
def tget(tenant_id:str,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); return ok(TENANTS.get(tenant_id),request.state.rid)
@app.patch('/v1/tenants/{tenant_id}')
def tpatch(tenant_id:str,payload:Tenant,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); TENANTS[tenant_id].update(payload.model_dump()); return ok(TENANTS[tenant_id],request.state.rid)
@app.post('/v1/tenants/{tenant_id}/suspend')
def ts(tenant_id:str,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); TENANTS[tenant_id]['status']='suspended'; return ok(TENANTS[tenant_id],request.state.rid)
@app.post('/v1/tenants/{tenant_id}/unsuspend')
def tu(tenant_id:str,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); TENANTS[tenant_id]['status']='active'; return ok(TENANTS[tenant_id],request.state.rid)
@app.post('/v1/plans')
def pcreate(payload:Plan,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); pid=str(uuid4()); PLANS[pid]={"id":pid,**payload.model_dump()}; return ok(PLANS[pid],request.state.rid)
@app.get('/v1/plans')
def plist(request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); return ok(list(PLANS.values()),request.state.rid)
@app.post('/v1/tenants/{tenant_id}/subscription')
def sset(tenant_id:str,payload:Subscription,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); SUBS[tenant_id]={"tenantId":tenant_id,**payload.model_dump()}; return ok(SUBS[tenant_id],request.state.rid)
@app.get('/v1/tenants/{tenant_id}/subscription')
def sget(tenant_id:str,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); return ok(SUBS.get(tenant_id),request.state.rid)
@app.post('/v1/tenants/{tenant_id}/invoices')
def inv(tenant_id:str,payload:Invoice,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); INVOICES.setdefault(tenant_id,[]).append(payload.model_dump()); return ok(INVOICES[tenant_id][-1],request.state.rid)
@app.get('/v1/tenants/{tenant_id}/invoices')
def invl(tenant_id:str,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); return ok(INVOICES.get(tenant_id,[]),request.state.rid)
@app.get('/v1/tenants/{tenant_id}/features')
def fg(tenant_id:str,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); return ok(FEATURES.get(tenant_id,{}),request.state.rid)
@app.patch('/v1/tenants/{tenant_id}/features')
def fp(tenant_id:str,payload:FeaturePatch,request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); FEATURES.setdefault(tenant_id,{}).update(payload.features); return ok(FEATURES[tenant_id],request.state.rid)
@app.get('/v1/health/services')
def hs(request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); return ok({'servicesUp':len(TENANTS)>=0},request.state.rid)
@app.get('/v1/metrics/summary')
def ms(request:Request,authorization:Optional[str]=Header(default=None,alias='Authorization')): auth(authorization); return ok({'tenantCount':len(TENANTS),'planCount':len(PLANS)},request.state.rid)
