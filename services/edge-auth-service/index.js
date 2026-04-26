const http = require('http');
const jwt = require('jsonwebtoken');

const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const USER_SERVICE_ROLES = ['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'];
const CAMPUS_SOCIAL_ROLES = ['STUDENT', 'FACULTY', 'TENANT_ADMIN'];

const tenantOnlyPrefixes = [
  '/v1/academic-years',
  '/v1/terms',
  '/v1/departments',
  '/v1/programs',
  '/v1/rooms',
  '/v1/courses',
  '/v1/sections',
  '/v1/sessions',
  '/v1/faculty',
  '/exams',
  '/questions',
  '/v1/attendance',
  '/v1/assessments',
  '/v1/final-grades',
  '/v1/files',
];

const campusSocialPrefixes = [
  '/v1/profiles',
  '/v1/friends',
  '/v1/groups',
  '/v1/feed',
  '/v1/posts',
  '/v1/reports',
  '/v1/moderation',
  '/v1/conversations',
  '/v1/calls',
  '/v1/notifications',
  '/v1/directory',
  '/v1/media',
];

function startsWithOneOf(pathname, prefixes) {
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

function getPolicy(pathname) {
  if (pathname.startsWith('/v1/users')) {
    return { authMode: 'jwt', tenantRequired: true, allowedRoles: USER_SERVICE_ROLES };
  }

  if (startsWithOneOf(pathname, campusSocialPrefixes)) {
    return { authMode: 'jwt', tenantRequired: true, allowedRoles: CAMPUS_SOCIAL_ROLES };
  }

  if (startsWithOneOf(pathname, tenantOnlyPrefixes)) {
    return { authMode: 'none', tenantRequired: true };
  }

  return { authMode: 'none', tenantRequired: false };
}

function writeJson(res, statusCode, payload, headers = {}) {
  res.writeHead(statusCode, {
    'content-type': 'application/json',
    ...headers,
  });
  res.end(JSON.stringify(payload));
}

function normalizeRole(decoded) {
  if (typeof decoded.role === 'string' && decoded.role.length > 0) {
    return decoded.role;
  }

  const realmRoles = decoded.realm_access && Array.isArray(decoded.realm_access.roles)
    ? decoded.realm_access.roles
    : [];

  return realmRoles[0] || '';
}

function verifyJwt(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { ok: false, statusCode: 401, payload: { code: 'UNAUTHORIZED', message: 'Access token required' } };
  }

  try {
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    const tenantId = decoded.tenantId || decoded.tenant_id || '';
    const role = normalizeRole(decoded);

    return {
      ok: true,
      decoded,
      userId: decoded.sub || '',
      email: decoded.email || '',
      role,
      tenantId,
    };
  } catch (_error) {
    return { ok: false, statusCode: 401, payload: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' } };
  }
}

function handleVerify(req, res) {
  const forwardedUri = req.headers['x-forwarded-uri'] || '/';
  const pathname = new URL(forwardedUri, 'http://localhost').pathname;
  const policy = getPolicy(pathname);
  const requestedTenantId = typeof req.headers['x-tenant-id'] === 'string' ? req.headers['x-tenant-id'].trim() : '';

  if (policy.authMode !== 'jwt') {
    if (policy.tenantRequired && !requestedTenantId) {
      return writeJson(res, 400, {
        code: 'TENANT_REQUIRED',
        message: 'X-Tenant-ID header is required',
      });
    }

    res.writeHead(200);
    res.end();
    return;
  }

  const verified = verifyJwt(req.headers.authorization);
  if (!verified.ok) {
    return writeJson(res, verified.statusCode, verified.payload);
  }

  if (policy.tenantRequired && !verified.tenantId && !requestedTenantId) {
    return writeJson(res, 400, {
      code: 'TENANT_REQUIRED',
      message: 'Tenant context is required',
    });
  }

  if (requestedTenantId && verified.tenantId && requestedTenantId !== verified.tenantId) {
    return writeJson(res, 403, {
      code: 'TENANT_CONTEXT_MISMATCH',
      message: 'Token tenant does not match header',
    });
  }

  if (policy.allowedRoles && !policy.allowedRoles.includes(verified.role)) {
    return writeJson(res, 403, {
      code: 'FORBIDDEN',
      message: 'Insufficient permissions',
    });
  }

  const responseHeaders = {
    'X-User-Id': verified.userId,
    'X-User-Role': verified.role,
    'X-Tenant-Id': verified.tenantId || requestedTenantId,
  };

  if (verified.email) {
    responseHeaders['X-User-Email'] = verified.email;
  }

  res.writeHead(200, responseHeaders);
  res.end();
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    return writeJson(res, 200, { status: 'ok', service: 'edge-auth-service' });
  }

  if (req.url === '/ready') {
    return writeJson(res, 200, { status: 'ok', service: 'edge-auth-service' });
  }

  if (req.url === '/verify') {
    return handleVerify(req, res);
  }

  return writeJson(res, 404, { code: 'NOT_FOUND', message: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`edge-auth-service listening on port ${PORT}`);
});
