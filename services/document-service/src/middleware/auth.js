const jwt = require('jsonwebtoken');

const extractTenantAndUser = (req, res, next) => {
  // 1. Tenant Context
  const tenantId = req.headers['x-tenant-id'];

  // Verify token claims if present (assuming Gateway forwards Auth header)
  const authHeader = req.headers['authorization'];
  let tokenTenant = null;
  let userId = null;
  let roles = [];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      // In production, verify signature. Here we decode for claims.
      const decoded = jwt.decode(token);
      if (decoded) {
        tokenTenant = decoded.tenant_id;
        userId = decoded.sub; // Keycloak ID
        roles = decoded.realm_access?.roles || [];
      }
    } catch (e) {
      console.warn('Failed to decode token', e);
    }
  }

  // Reconcile Tenant
  if (!tenantId) {
    return res.status(400).json({
      code: 'MISSING_TENANT_CONTEXT',
      message: 'X-Tenant-ID header missing',
      details: null
    });
  }

  if (tokenTenant && tokenTenant !== tenantId) {
    return res.status(403).json({
      code: 'TENANT_CONTEXT_MISMATCH',
      message: 'Token tenant does not match header',
      details: { tokenTenant, headerTenant: tenantId }
    });
  }

  req.tenantId = tenantId;
  req.user = {
    id: userId || req.headers['x-user-id'], // Fallback to header if Gateway sets it
    roles: roles,
  };

  next();
};

module.exports = { extractTenantAndUser };
