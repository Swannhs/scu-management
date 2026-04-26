import os
import uuid
from datetime import date
import json
import sys
from unittest.mock import MagicMock

# Mock pika before importing main/events to avoid RabbitMQ connection
sys.modules["pika"] = MagicMock()

import pytest
from fastapi.testclient import TestClient
from jose import jwt, jwk
from jose.constants import ALGORITHMS

os.environ["DATABASE_URL"] = "sqlite:///./test_enrollment.db"
os.environ["KEYCLOAK_JWKS_URL"] = "http://keycloak.test/realms/scu/protocol/openid-connect/certs"
os.environ["KEYCLOAK_ISSUER"] = "http://keycloak.test/realms/scu"
os.environ["KEYCLOAK_AUDIENCE"] = "enrollment-service"

from main import app  # noqa: E402
import auth # noqa: E402
import database # noqa: E402

client = TestClient(app)

# Generate RSA Key Pair for testing
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend

def generate_rsa_key_pair():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
    )
    public_key = private_key.public_key()

    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    )

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    return private_pem, public_pem

PRIVATE_KEY_PEM, PUBLIC_KEY_PEM = generate_rsa_key_pair()
OTHER_PRIVATE_KEY_PEM, _ = generate_rsa_key_pair()

# Create JWK from public key
_public_key_obj = jwk.construct(PUBLIC_KEY_PEM.decode('utf-8'), algorithm=ALGORITHMS.RS256)
PUBLIC_JWK = _public_key_obj.to_dict()
# Ensure kid is present and alg/use are set
PUBLIC_JWK['kid'] = 'test-key-id'
PUBLIC_JWK['alg'] = 'RS256'
PUBLIC_JWK['use'] = 'sig'

def make_token(tenant_id: str | None, roles: list[str], user_id: str | None = None, kid: str | None = None,
               issuer: str | None = None, audience: str | None = None, private_key=None) -> str:
    payload = {
        "sub": user_id or f"user-{uuid.uuid4()}",
        "realm_access": {"roles": roles},
        "aud": audience if audience is not None else os.environ["KEYCLOAK_AUDIENCE"],
        "iss": issuer if issuer is not None else os.environ["KEYCLOAK_ISSUER"],
        "exp": 9999999999, # Far future
    }
    if tenant_id is not None:
        payload["tenant_id"] = tenant_id

    headers = {"kid": kid or PUBLIC_JWK["kid"]}

    key_to_use = private_key or PRIVATE_KEY_PEM

    return jwt.encode(payload, key_to_use, algorithm=ALGORITHMS.RS256, headers=headers)

def auth_headers(tenant_id: str | None, roles: list[str], user_id: str | None = None, tenant_header: str | None = None,
                 kid: str | None = None, issuer: str | None = None, audience: str | None = None, private_key=None) -> dict:
    token = make_token(tenant_id, roles, user_id, kid, issuer, audience, private_key)
    headers = {"Authorization": f"Bearer {token}"}
    if tenant_header:
        headers["X-Tenant-ID"] = tenant_header
    return headers

@pytest.fixture(autouse=True)
def _reset_db(monkeypatch):
    # Mock requests.get for JWKS
    auth._JWKS_CACHE = None

    def _fake_get(url, timeout=5):
        class _Response:
            def raise_for_status(self):
                return None
            def json(self):
                return {"keys": [PUBLIC_JWK]}

        if url == os.environ["KEYCLOAK_JWKS_URL"]:
            return _Response()
        raise Exception(f"Unexpected URL: {url}")

    monkeypatch.setattr(auth.requests, "get", _fake_get)

    # Reset DB using schema operations instead of file deletion
    # to avoid "readonly database" errors with SQLite engine
    import models # Ensure models are loaded
    database.Base.metadata.drop_all(bind=database.engine)
    database.Base.metadata.create_all(bind=database.engine)

    yield

    database.Base.metadata.drop_all(bind=database.engine)

def test_tenant_mismatch_rejected():
    headers = auth_headers("tenant-a", ["TENANT_ADMIN"], tenant_header="tenant-b")
    response = client.post(
        "/v1/intake-terms",
        headers=headers,
        json={
            "name": "Fall",
            "code": "F24",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )
    assert response.status_code == 403
    assert response.json()["code"] == "TENANT_CONTEXT_MISMATCH"

def test_missing_tenant_claim_rejected():
    headers = auth_headers(None, ["TENANT_ADMIN"], tenant_header=None)
    response = client.post(
        "/v1/intake-terms",
        headers=headers,
        json={
            "name": "Fall",
            "code": "F24",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )
    assert response.status_code == 401
    assert response.json()["code"] == "TENANT_ID_MISSING"

def test_invalid_signature_rejected():
    # Sign with a different private key
    headers = auth_headers("tenant-a", ["TENANT_ADMIN"], tenant_header="tenant-a", private_key=OTHER_PRIVATE_KEY_PEM)
    response = client.post(
        "/v1/intake-terms",
        headers=headers,
        json={
            "name": "Fall",
            "code": "F24",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )
    assert response.status_code == 401
    assert response.json()["code"] == "INVALID_TOKEN"

def test_wrong_issuer_rejected():
    headers = auth_headers("tenant-a", ["TENANT_ADMIN"], tenant_header="tenant-a", issuer="http://wrong-issuer.com")
    response = client.post(
        "/v1/intake-terms",
        headers=headers,
        json={
            "name": "Fall",
            "code": "F24",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )
    assert response.status_code == 401
    assert response.json()["code"] == "INVALID_TOKEN"

def test_wrong_audience_rejected():
    headers = auth_headers("tenant-a", ["TENANT_ADMIN"], tenant_header="tenant-a", audience="wrong-audience")
    response = client.post(
        "/v1/intake-terms",
        headers=headers,
        json={
            "name": "Fall",
            "code": "F24",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )
    assert response.status_code == 401
    assert response.json()["code"] == "INVALID_TOKEN"

def test_rbac_forbidden():
    headers = auth_headers("tenant-a", ["STUDENT"], tenant_header="tenant-a")
    response = client.post(
        "/v1/intake-terms",
        headers=headers,
        json={
            "name": "Fall",
            "code": "F24",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )
    assert response.status_code == 403
    assert response.json()["code"] == "FORBIDDEN"

def test_tenant_scoping_on_list():
    headers_a = auth_headers("tenant-a", ["TENANT_ADMIN"], tenant_header="tenant-a")
    headers_b = auth_headers("tenant-b", ["TENANT_ADMIN"], tenant_header="tenant-b")

    client.post(
        "/v1/intake-terms",
        headers=headers_a,
        json={
            "name": "Fall A",
            "code": "F24A",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )
    client.post(
        "/v1/intake-terms",
        headers=headers_b,
        json={
            "name": "Fall B",
            "code": "F24B",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )

    response = client.get("/v1/intake-terms", headers=headers_a)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Fall A"

def test_enrollment_idempotency():
    headers = auth_headers("tenant-a", ["TENANT_ADMIN"], tenant_header="tenant-a")
    body = {"studentId": "student-1", "sectionId": "section-1"}

    first = client.post("/v1/enrollments", headers=headers, json=body)
    assert first.status_code == 201

    second = client.post("/v1/enrollments", headers=headers, json=body)
    assert second.status_code == 409
    assert second.json()["code"] == "ALREADY_ENROLLED"

def test_application_approval_creates_student():
    tenant_id = "tenant-a"
    student_user_id = f"user-{uuid.uuid4()}"
    student_headers = auth_headers(tenant_id, ["STUDENT"], user_id=student_user_id, tenant_header=tenant_id)
    registrar_headers = auth_headers(tenant_id, ["REGISTRAR"], tenant_header=tenant_id)
    admin_headers = auth_headers(tenant_id, ["TENANT_ADMIN"], tenant_header=tenant_id)

    intake_response = client.post(
        "/v1/intake-terms",
        headers=admin_headers,
        json={
            "name": "Fall",
            "code": "F24",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
        },
    )
    intake_id = intake_response.json()["id"]

    application_response = client.post(
        "/v1/applications",
        headers=student_headers,
        json={
            "intake_id": intake_id,
            "first_name": "Ada",
            "last_name": "Lovelace",
            "email": "ada@example.com",
            "program_id": "program-1",
        },
    )
    application_id = application_response.json()["id"]

    approval_response = client.post(f"/v1/applications/{application_id}/approve", headers=registrar_headers)
    assert approval_response.status_code == 201
    assert approval_response.json()["user_id"] == student_user_id
