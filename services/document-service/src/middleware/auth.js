const errorResponse = (res, status, code, message, details) =>
  res.status(status).json({ code, message, details });

const decodeJwt = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = Buffer.from(parts[1], 'base64').toString('utf8');
    return JSON.parse(payload);
  } catch (error) {
    console.warn('Failed to decode token', error);
    return null;
  }
};

const extractTenantAndUser = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];
  const authHeader = req.headers['authorization'];
  let tokenTenant = null;
  let userId = null;
  let roles = [];
  let groups = [];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = decodeJwt(token);
    if (decoded) {
      tokenTenant = decoded.tenant_id;
      userId = decoded.sub;
      roles = decoded.realm_access?.roles || [];
      groups = decoded.groups || [];
    }
  }

  if (!tenantId) {
    return errorResponse(res, 400, 'TENANT_HEADER_MISSING', 'X-Tenant-ID header missing');
  }

  if (tokenTenant && tokenTenant !== tenantId) {
    return errorResponse(res, 403, 'TENANT_CONTEXT_MISMATCH', 'Token tenant does not match header');
  }

  const headerUserId = req.headers['x-user-id'];
  const resolvedUserId = userId || headerUserId;

  if (!resolvedUserId) {
    return errorResponse(res, 401, 'UNAUTHENTICATED', 'Authentication required');
  }

  req.tenantId = tenantId;
  req.user = {
    id: resolvedUserId,
    roles,
    groups,
  };

  next();
};

module.exports = { extractTenantAndUser };
