const { extractTenantAndUser } = require('./src/middleware/auth');
const { isAccessAllowed } = require('./src/access');

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
