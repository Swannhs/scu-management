import { BadRequestException, ForbiddenException, Logger } from '@nestjs/common';
import { Request } from 'express';

export interface TenantContext {
  effectiveTenantId: string;
  isGlobalAdmin: boolean;
  isTenantAdmin: boolean;
  actor: {
    keycloakId?: string;
    roles: string[];
  };
}

export class TenantContextFactory {
  private static readonly logger = new Logger(TenantContextFactory.name);

  static fromRequest(user: any, req: Request, requestedTenant?: string): TenantContext {
    const headerTenant = (req.headers['x-tenant-id'] as string | undefined)?.trim();
    const tokenTenant = user?.tenant_id;
    const isGlobalAdmin = Boolean(user?.realm_access?.roles?.includes('admin'));
    const isTenantAdmin = Boolean(
      user?.realm_access?.roles?.includes('TENANT_ADMIN') ||
        user?.resource_access?.['realm-management']?.roles?.includes('TENANT_ADMIN'),
    );

    if (headerTenant && tokenTenant && headerTenant !== tokenTenant) {
      this.logger.warn(
        `Tenant context mismatch: header=${headerTenant}, token=${tokenTenant}, actor=${user?.sub ?? 'unknown'}`,
      );
      throw new ForbiddenException({
        code: 'TENANT_CONTEXT_MISMATCH',
        message: 'Token tenant_id does not match X-Tenant-ID',
        details: { headerTenantId: headerTenant, tokenTenantId: tokenTenant },
      });
    }

    const effectiveTenantId = requestedTenant ?? headerTenant ?? tokenTenant;

    if (!effectiveTenantId) {
      throw new BadRequestException('tenant context missing');
    }

    if (!isGlobalAdmin && effectiveTenantId !== tokenTenant) {
      throw new ForbiddenException('Tenant administrators cannot act on other tenants');
    }

    return {
      effectiveTenantId,
      isGlobalAdmin,
      isTenantAdmin,
      actor: {
        keycloakId: user?.sub,
        roles: user?.realm_access?.roles ?? [],
      },
    };
  }
}
