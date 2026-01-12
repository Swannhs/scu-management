import os
import uuid
from datetime import date

import pytest
from fastapi.testclient import TestClient
from jose import jwt

os.environ["DATABASE_URL"] = "sqlite:///./test_enrollment.db"

from main import app  # noqa: E402

client = TestClient(app)

SECRET = "test-secret"


def make_token(tenant_id: str, roles: list[str], user_id: str | None = None) -> str:
    payload = {
        "tenant_id": tenant_id,
        "sub": user_id or f"user-{uuid.uuid4()}",
        "realm_access": {"roles": roles},
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")


def auth_headers(tenant_id: str, roles: list[str], user_id: str | None = None, tenant_header: str | None = None) -> dict:
    token = make_token(tenant_id, roles, user_id)
    headers = {"Authorization": f"Bearer {token}"}
    if tenant_header:
        headers["X-Tenant-ID"] = tenant_header
    return headers


@pytest.fixture(autouse=True)
def _reset_db():
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
    body = {"studentId": "student-1", "offeringId": "offering-1"}

    first = client.post("/v1/enrollments", headers=headers, json=body)
    assert first.status_code == 201

    second = client.post("/v1/enrollments", headers=headers, json=body)
    assert second.status_code == 409
    assert second.json()["code"] == "ALREADY_ENROLLED"
