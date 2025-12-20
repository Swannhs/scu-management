import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(private readonly tenantService: TenantService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const hostname = req.hostname;

        // In production, we assume load balancer passes the actual host via X-Forwarded-Host
        const actualHost = (req.headers['x-forwarded-host'] as string) || hostname;

        const tenantId = await this.tenantService.resolveTenantId(actualHost);

        if (!tenantId) {
            // Allow if it's a global route or a ping, but generally for SaaS we need a tenant
            // For MVP, we'll just fail if not found
            throw new UnauthorizedException(`Could not resolve tenant for host: ${actualHost}`);
        }

        // Inject into headers so downstream services can use it
        req.headers['x-tenant-id'] = tenantId;

        next();
    }
}
