from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
H={"Authorization":"Bearer u1|t1|TENANT_ADMIN","X-Tenant-ID":"t1"}

def test_club_lifecycle():
    c=client.post('/v1/clubs',json={'name':'Robotics','category':'tech'},headers=H)
    assert c.status_code==200
    cid=c.json()['data']['id']
    j=client.post(f'/v1/clubs/{cid}/join',headers={"Authorization":"Bearer s1|t1|STUDENT","X-Tenant-ID":"t1"})
    assert j.status_code==200
    m=client.get(f'/v1/clubs/{cid}/members',headers=H)
    assert any(x['userId']=='s1' for x in m.json()['data'])
