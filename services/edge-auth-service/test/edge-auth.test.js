const assert = require('node:assert/strict');
const http = require('node:http');
const test = require('node:test');
const jwt = require('jsonwebtoken');

const { createServer, getPolicy } = require('../index');

const JWT_SECRET = 'test-secret';

function request(server, headers) {
  return new Promise((resolve, reject) => {
    const address = server.address();
    const req = http.request({
      host: '127.0.0.1',
      port: address.port,
      path: '/verify',
      headers,
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('protects academic routes with JWT authentication', () => {
  assert.deepEqual(getPolicy('/v1/courses'), { authMode: 'jwt', tenantRequired: true });
  assert.deepEqual(getPolicy('/v1/attendance'), { authMode: 'jwt', tenantRequired: true });
  assert.deepEqual(getPolicy('/v1/enrollments'), { authMode: 'jwt', tenantRequired: true });
  assert.deepEqual(getPolicy('/v1/students/me'), { authMode: 'jwt', tenantRequired: true });
  assert.deepEqual(getPolicy('/v1/grades/me'), { authMode: 'jwt', tenantRequired: true });
});

test('rejects an unauthenticated request to an academic route', async () => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = JWT_SECRET;
  const server = createServer().listen(0);

  try {
    const response = await request(server, { 'x-forwarded-uri': '/v1/courses' });
    assert.equal(response.statusCode, 401);
    assert.equal(JSON.parse(response.body).code, 'UNAUTHORIZED');
  } finally {
    await new Promise((resolve) => server.close(resolve));
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  }
});

test('uses the verified token tenant and rejects tenant overrides', async () => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = JWT_SECRET;
  const token = jwt.sign({ sub: 'student-1', tenantId: 'tenant-a', role: 'STUDENT' }, JWT_SECRET);
  const server = createServer().listen(0);

  try {
    const allowed = await request(server, {
      'x-forwarded-uri': '/v1/courses',
      authorization: `Bearer ${token}`,
    });
    assert.equal(allowed.statusCode, 200);
    assert.equal(allowed.headers['x-tenant-id'], 'tenant-a');

    const denied = await request(server, {
      'x-forwarded-uri': '/v1/courses',
      authorization: `Bearer ${token}`,
      'x-tenant-id': 'tenant-b',
    });
    assert.equal(denied.statusCode, 403);
    assert.equal(JSON.parse(denied.body).code, 'TENANT_CONTEXT_MISMATCH');
  } finally {
    await new Promise((resolve) => server.close(resolve));
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  }
});
