from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def auth(role='SUPER_ADMIN'):
    return {"Authorization": f"Bearer sa|global|{role}"}


def test_super_admin_required():
    r = client.get('/v1/tenants')
    assert r.status_code == 401
    r = client.get('/v1/tenants', headers=auth(role='TENANT_ADMIN'))
    assert r.status_code == 403


def test_tenant_plan_subscription_flow():
    t = client.post('/v1/tenants', json={'name': 'Tenant A', 'domain': 'a.edu'}, headers=auth())
    assert t.status_code == 200
    tenant_id = t.json()['data']['id']

    p = client.post('/v1/plans', json={'name': 'Pro', 'monthlyPrice': 99.0}, headers=auth())
    plan_id = p.json()['data']['id']

    s = client.post(f'/v1/tenants/{tenant_id}/subscription', json={'planId': plan_id}, headers=auth())
    assert s.status_code == 200
