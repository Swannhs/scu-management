const { extractTenantAndUser } = require('./src/middleware/auth');
const { isAccessAllowed } = require('./src/access');
const { createApp } = require('./src/app');
const request = require('supertest');

const createJwt = (payload) => {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${header}.${body}.`;
};

const buildRes = () => {
  const res = {};
  res.statusCode = null;
  res.body = null;
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  return res;
};

describe('auth middleware', () => {
  it('returns 403 on tenant mismatch', () => {
    const token = createJwt({ tenant_id: 'tenant-b', sub: 'user-1' });
    const req = {
      headers: {
        'x-tenant-id': 'tenant-a',
        authorization: `Bearer ${token}`,
      },
    };
    const res = buildRes();
    const next = jest.fn();

    extractTenantAndUser(req, res, next);

    expect(res.statusCode).toBe(403);
    expect(res.body.code).toBe('TENANT_CONTEXT_MISMATCH');
    expect(next).not.toHaveBeenCalled();
  });
});

describe('access policy evaluation', () => {
  it('denies private file without grant', () => {
    const file = { access_policy: 'PRIVATE', uploaded_by: 'owner-1' };
    const allowed = isAccessAllowed({ file, userId: 'user-2', hasGrant: false });
    expect(allowed).toBe(false);
  });

  it('allows shared file with grant', () => {
    const file = { access_policy: 'SHARED', uploaded_by: 'owner-1' };
    const allowed = isAccessAllowed({ file, userId: 'user-2', hasGrant: true });
    expect(allowed).toBe(true);
  });
});

describe('file content endpoints', () => {
  const tenantId = 'tenant-a';
  const ownerId = 'user-1';
  const fileId = 'file-1';
  const storageKey = `${tenantId}/campus-social-service/post-1/${fileId}/image.png`;
  const uploadToken = createJwt({ tenant_id: tenantId, sub: ownerId });
  const headers = {
    Authorization: `Bearer ${uploadToken}`,
    'X-Tenant-ID': tenantId,
  };

  afterEach(async () => {
    await require('fs/promises').rm(`uploads/${tenantId}`, { recursive: true, force: true });
  });

  it('stores binary content and returns it through the content endpoint', async () => {
    const fileRow = {
      id: fileId,
      tenant_id: tenantId,
      uploaded_by: ownerId,
      storage_key: storageKey,
      mime_type: 'image/png',
      status: 'ACTIVE',
      access_policy: 'PRIVATE',
    };

    const pool = {
      query: jest.fn(async (query) => {
        if (query.includes('SELECT * FROM files')) {
          return { rows: [fileRow] };
        }

        if (query.includes('SELECT 1 FROM file_access_grants')) {
          return { rows: [] };
        }

        throw new Error(`Unexpected query: ${query}`);
      }),
      connect: jest.fn(),
    };

    const app = createApp({ pool });
    const content = Buffer.from('fake-image-content');

    await request(app)
      .put(`/v1/files/${fileId}/content`)
      .set(headers)
      .set('Content-Type', 'image/png')
      .send(content)
      .expect(204);

    const response = await request(app)
      .get(`/v1/files/${fileId}/content`)
      .set(headers)
      .expect(200);

    expect(response.headers['content-type']).toContain('image/png');
    expect(Buffer.compare(response.body, content)).toBe(0);
  });

  it('rejects completing an upload before binary content exists', async () => {
    const fileRow = {
      id: fileId,
      tenant_id: tenantId,
      uploaded_by: ownerId,
      storage_key: storageKey,
      mime_type: 'image/png',
      status: 'PENDING',
      access_policy: 'PRIVATE',
    };

    const client = {
      query: jest.fn(async (query) => {
        if (query === 'BEGIN' || query === 'ROLLBACK') {
          return { rows: [] };
        }

        if (query.includes('SELECT * FROM files')) {
          return { rows: [fileRow] };
        }

        throw new Error(`Unexpected query: ${query}`);
      }),
      release: jest.fn(),
    };

    const pool = {
      connect: jest.fn(async () => client),
      query: jest.fn(),
    };

    const app = createApp({ pool });

    const response = await request(app)
      .post('/v1/files/complete-upload')
      .set(headers)
      .send({ fileId })
      .expect(409);

    expect(response.body.code).toBe('UPLOAD_INCOMPLETE');
    expect(client.query).toHaveBeenCalledWith('ROLLBACK');
  });
});
