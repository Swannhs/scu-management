import os
from jose import jwt, JWTError, jwk
from jose.utils import base64url_decode
from fastapi import HTTPException, Security, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import requests

security = HTTPBearer()

KEYCLOAK_URL = os.getenv("KEYCLOAK_AUTH_SERVER_URL", "http://keycloak:8080")
REALM = os.getenv("KEYCLOAK_REALM", "university-platform")
JWKS_URL = os.getenv(
    "KEYCLOAK_JWKS_URL",
    f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/certs",
)
ISSUER = os.getenv("KEYCLOAK_ISSUER", f"{KEYCLOAK_URL}/realms/{REALM}")
AUDIENCE = os.getenv("KEYCLOAK_AUDIENCE", "account")

_JWKS_CACHE: dict | None = None

class UserContext(BaseModel):
    user_id: str
    tenant_id: str
    roles: List[str]


def _fetch_jwks() -> dict:
    global _JWKS_CACHE
    if _JWKS_CACHE:
        return _JWKS_CACHE
    try:
        response = requests.get(JWKS_URL, timeout=5)
        response.raise_for_status()
        _JWKS_CACHE = response.json()
        return _JWKS_CACHE
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=401,
            detail={"code": "JWKS_FETCH_FAILED", "message": "Unable to verify token", "details": None},
        ) from exc


def _verify_and_decode(token: str) -> dict:
    try:
        headers = jwt.get_unverified_header(token)
        kid = headers.get("kid")
        jwks = _fetch_jwks()
        keys = jwks.get("keys", [])
        if not kid:
            raise HTTPException(
                status_code=401,
                detail={"code": "INVALID_TOKEN", "message": "Token missing key id", "details": None},
            )
        key_data = next((key for key in keys if key.get("kid") == kid), None)
        if not key_data:
            raise HTTPException(
                status_code=401,
                detail={"code": "INVALID_TOKEN", "message": "Token key not recognized", "details": None},
            )
        if key_data.get("kty") == "oct":
            key_material = base64url_decode(key_data["k"])
        else:
            key = jwk.construct(key_data)
            key_material = key.to_pem()
        return jwt.decode(
            token,
            key_material,
            algorithms=[key_data.get("alg", "RS256")],
            audience=AUDIENCE,
            issuer=ISSUER,
            options={
                "verify_signature": True,
                "verify_aud": True,
                "verify_iss": True,
                "verify_exp": True,
            },
        )
    except JWTError as exc:
        raise HTTPException(
            status_code=401,
            detail={"code": "INVALID_TOKEN", "message": "Invalid token", "details": None},
        ) from exc


async def get_user_context(
    res: HTTPAuthorizationCredentials = Security(security),
    tenant_header: Optional[str] = Header(None, alias="X-Tenant-ID")
) -> UserContext:
    token = res.credentials
    payload = _verify_and_decode(token)

    tenant_id = payload.get("tenant_id")
    user_id = payload.get("sub")

    # Keycloak roles are usually in realm_access.roles
    roles = payload.get("realm_access", {}).get("roles", [])

    is_global_admin = "admin" in roles

    if tenant_header and tenant_id and tenant_header != tenant_id and not is_global_admin:
        raise HTTPException(
            status_code=403,
            detail={"code": "TENANT_CONTEXT_MISMATCH", "message": "Tenant context mismatch", "details": None},
        )

    effective_tenant_id = tenant_header or tenant_id

    if is_global_admin and not effective_tenant_id:
        raise HTTPException(
            status_code=400,
            detail={"code": "TENANT_ID_REQUIRED", "message": "Tenant ID required for global admin", "details": None},
        )

    if not effective_tenant_id:
        raise HTTPException(
            status_code=401,
            detail={"code": "TENANT_ID_MISSING", "message": "Tenant ID missing in token", "details": None},
        )

    return UserContext(user_id=user_id, tenant_id=effective_tenant_id, roles=roles)
