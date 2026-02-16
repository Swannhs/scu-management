from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def auth(user='u1', tenant='t1', roles='STUDENT'):
    return {"Authorization": f"Bearer {user}|{tenant}|{roles}", "X-Tenant-ID": tenant}


def test_tenant_guard_cases():
    payload = {
        "title": "Hackathon",
        "description": "Annual",
        "starts_at": "2026-01-10T10:00:00",
        "ends_at": "2026-01-10T12:00:00",
        "type": "competition"
    }
    r = client.post('/v1/events', json=payload)
    assert r.status_code == 400
    r = client.post('/v1/events', json=payload, headers={"X-Tenant-ID": "t1", "Authorization": "Bearer bad"})
    assert r.status_code == 401
    r = client.post('/v1/events', json=payload, headers={"X-Tenant-ID": "t1", "Authorization": "Bearer u|t2|TENANT_ADMIN"})
    assert r.status_code == 403


def test_event_registration_flow():
    payload = {
        "title": "Seminar",
        "description": "Talk",
        "starts_at": "2026-01-10T10:00:00",
        "ends_at": "2026-01-10T12:00:00",
        "type": "seminar"
    }
    create = client.post('/v1/events', json=payload, headers=auth(roles='TENANT_ADMIN'))
    assert create.status_code == 200
    event_id = create.json()['data']['id']

    pub = client.post(f'/v1/events/{event_id}/publish', headers=auth(roles='TENANT_ADMIN'))
    assert pub.status_code == 200

    reg = client.post(f'/v1/events/{event_id}/register', headers=auth(user='s1', roles='STUDENT'))
    assert reg.status_code == 200

    participants = client.get(f'/v1/events/{event_id}/participants', headers=auth(roles='TENANT_ADMIN'))
    assert participants.status_code == 200
    assert 's1' in participants.json()['data']
