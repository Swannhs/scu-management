import { Request, Response, NextFunction } from 'express';
import { getServiceConfig } from '../config/services.config';

export interface TenantRequest extends Request {
  tenantId?: string;
}

export function tenantMiddleware(
  req: TenantRequest,
  res: Response,
  next: NextFunction,
) {
  const serviceConfig = getServiceConfig(req.path);
  if (!serviceConfig || !serviceConfig.tenantRequired) {
    return next();
  }

  const tenantId = req.headers['x-tenant-id'] as string;

  if (!tenantId) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'TENANT_REQUIRED',
        message: 'X-Tenant-ID header is required',
      },
    });
  }

  req.tenantId = tenantId;
  next();
}
