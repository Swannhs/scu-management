import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getServiceConfig } from '../config/services.config';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
    tenantId: string;
  };
  tenantId?: string;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const path = req.path;
  const serviceConfig = getServiceConfig(path);

  // Keycloak-backed services authenticate downstream; only local user-service JWTs are validated here.
  if (!serviceConfig || serviceConfig.authMode !== 'gateway-jwt') {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Access token required',
      },
    });
  }

  const token = authHeader.substring(7);

  try {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, jwtSecret) as any;

    req.user = {
      userId: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      tenantId: decoded.tenantId,
    };

    // Check role-based access if specified
    if (
      serviceConfig.allowedRoles &&
      !serviceConfig.allowedRoles.includes(decoded.role)
    ) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions',
        },
      });
    }

    // Forward user info to downstream services
    req.headers['x-user-id'] = decoded.sub;
    req.headers['x-user-role'] = decoded.role;
    req.headers['x-tenant-id'] = decoded.tenantId;

    next();
  } catch (_error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      },
    });
  }
}
