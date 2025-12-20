import os
from jose import jwt, JWTError
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional

security = HTTPBearer()

KEYCLOAK_URL = os.getenv("KEYCLOAK_AUTH_SERVER_URL", "http://keycloak:8080")
REALM = os.getenv("KEYCLOAK_REALM", "university-platform")
# In production, you would fetch the public key from Keycloak's certs endpoint
# For MVP, we assume a shared secret or skip signature check if inside private network (not recommended for prod)
# We will use the decoding without verification for MVP demo if public key isn't provided, 
# but ideally we fetch from http://keycloak:8080/realms/university-platform/protocol/openid-connect/certs

class UserContext(BaseModel):
    user_id: str
    tenant_id: str
    roles: List[str]

async def get_user_context(res: HTTPAuthorizationCredentials = Security(security)) -> UserContext:
    token = res.credentials
    try:
        # Note: In a real world, verify=True with public key
        payload = jwt.get_unverified_claims(token)
        
        tenant_id = payload.get("tenant_id")
        user_id = payload.get("sub")
        
        # Keycloak roles are usually in realm_access.roles
        roles = payload.get("realm_access", {}).get("roles", [])

        if not tenant_id:
            raise HTTPException(status_code=401, detail="Tenant ID missing in token")

        return UserContext(user_id=user_id, tenant_id=tenant_id, roles=roles)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
