import { BadRequestException, ForbiddenException } from '@nestjs/common';
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
  static fromRequest(user: any, req: Request, requestedTenant?: string): TenantContext {
    const headerTenant = (req.headers['x-tenant-id'] as string | undefined)?.trim();
    const tokenTenant = user?.tenant_id;
    const isGlobalAdmin = Boolean(user?.realm_access?.roles?.includes('admin'));
    const isTenantAdmin = Boolean(
      user?.realm_access?.roles?.includes('TENANT_ADMIN') ||
        user?.resource_access?.['realm-management']?.roles?.includes('TENANT_ADMIN'),
    );

    if (headerTenant && tokenTenant && headerTenant !== tokenTenant) {
      throw new ForbiddenException('TENANT_CONTEXT_MISMATCH');
    }

    const effectiveTenantId = requestedTenant ?? headerTenant ?? tokenTenant;

    if (!effectiveTenantId) {
      throw new BadRequestException('tenant context missing');
    }

    if (!isGlobalAdmin && effectiveTenantId !== tokenTenant) {
      throw new ForbiddenException('TENANT_CONTEXT_MISMATCH');
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
