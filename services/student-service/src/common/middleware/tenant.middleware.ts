import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Extend Request interface locally for TypeScript
interface AuthenticatedRequest extends Request {
  tenantId?: string;
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      throw new BadRequestException('x-tenant-id header is missing');
    }
    // Validate tenantId format if needed (e.g. UUID or alphanumeric)
    // For now, we trust it as a string
    req.tenantId = tenantId.toString();
    next();
  }
}
