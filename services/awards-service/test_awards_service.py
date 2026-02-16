from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
H={"Authorization":"Bearer a1|t1|TENANT_ADMIN","X-Tenant-ID":"t1"}

def test_award_certificate_flow():
    a=client.post('/v1/awards',json={'name':'Top Performer'},headers=H)
    assert a.status_code==200
    aid=a.json()['data']['id']
    client.post(f'/v1/awards/{aid}/nominate',json={'studentId':'stu1'},headers=H)
    client.post(f'/v1/awards/{aid}/approve',json={'studentId':'stu1'},headers=H)
    cert=client.post(f'/v1/awards/{aid}/issue-certificate',json={'studentId':'stu1'},headers=H)
    assert cert.status_code==200
