import os
import uuid
from datetime import date

import pytest
from fastapi.testclient import TestClient
from jose import jwt
from jose.utils import base64url_encode

os.environ["DATABASE_URL"] = "sqlite:///./test_enrollment.db"
os.environ["KEYCLOAK_JWKS_URL"] = "https://keycloak.test/realms/university-platform/protocol/openid-connect/certs"
os.environ["KEYCLOAK_ISSUER"] = "https://keycloak.test/realms/university-platform"
os.environ["KEYCLOAK_AUDIENCE"] = "enrollment-service"

from main import app  # noqa: E402

client = TestClient(app)


def _build_hmac_key():
    secret = os.urandom(32)
    return secret, {
        "kty": "oct",
        "kid": f"kid-{uuid.uuid4()}",
        "use": "sig",
        "alg": "HS256",
        "k": base64url_encode(secret).decode(),
    }


HMAC_SECRET, PUBLIC_JWK = _build_hmac_key()


def make_token(tenant_id: str | None, roles: list[str], user_id: str | None = None, kid: str | None = None) -> str:
    payload = {
        "sub": user_id or f"user-{uuid.uuid4()}",
        "realm_access": {"roles": roles},
        "aud": os.environ["KEYCLOAK_AUDIENCE"],
        "iss": os.environ["KEYCLOAK_ISSUER"],
    }
    if tenant_id is not None:
        payload["tenant_id"] = tenant_id
    return jwt.encode(payload, HMAC_SECRET, algorithm="HS256", headers={"kid": kid or PUBLIC_JWK["kid"]})


def auth_headers(tenant_id: str | None, roles: list[str], user_id: str | None = None, tenant_header: str | None = None) -> dict:
    token = make_token(tenant_id, roles, user_id)
    headers = {"Authorization": f"Bearer {token}"}
    if tenant_header:
        headers["X-Tenant-ID"] = tenant_header
    return headers


@pytest.fixture(autouse=True)
def _reset_db(monkeypatch):
    import auth

    auth._JWKS_CACHE = None

    def _fake_get(url, timeout=5):
        class _Response:
            def raise_for_status(self):
                return None

            def json(self):
                return {"keys": [PUBLIC_JWK]}

        return _Response()

    monkeypatch.setattr(auth.requests, "get", _fake_get)
    if os.path.exists("test_enrollment.db"):
        os.remove("test_enrollment.db")
    yield
    if os.path.exists("test_enrollment.db"):
        os.remove("test_enrollment.db")


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
    other_secret, _ = _build_hmac_key()
    token = jwt.encode(
        {
            "tenant_id": "tenant-a",
            "sub": f"user-{uuid.uuid4()}",
            "realm_access": {"roles": ["TENANT_ADMIN"]},
            "aud": os.environ["KEYCLOAK_AUDIENCE"],
            "iss": os.environ["KEYCLOAK_ISSUER"],
        },
        other_secret,
        algorithm="HS256",
        headers={"kid": PUBLIC_JWK["kid"]},
    )
    response = client.post(
        "/v1/intake-terms",
        headers={"Authorization": f"Bearer {token}", "X-Tenant-ID": "tenant-a"},
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
    assert approval_response.json()["userId"] == student_user_id
