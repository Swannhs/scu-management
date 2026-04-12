import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

export interface TenantContext {
  effectiveTenantId: string;
  actorId: string;
  roles: string[];
  isPlatformAdmin: boolean;
}

export class TenantContextFactory {
  static fromRequest(user: any, req: Request): TenantContext {
    const headerTenant = (req.headers['x-tenant-id'] as string | undefined)?.trim();
    const tokenTenant = user?.tenant_id;
    const roles = user?.realm_access?.roles ?? [];
    const isPlatformAdmin = roles.includes('admin') || roles.includes('PLATFORM_ADMIN');

    if (headerTenant && tokenTenant && headerTenant !== tokenTenant) {
      throw new ForbiddenException('TENANT_CONTEXT_MISMATCH');
    }

    const effectiveTenantId = headerTenant ?? tokenTenant;
    if (!effectiveTenantId) {
      throw new BadRequestException('tenant context missing');
    }

    if (!isPlatformAdmin && effectiveTenantId !== tokenTenant) {
      throw new ForbiddenException('TENANT_CONTEXT_MISMATCH');
    }

    if (!user?.sub) {
      throw new ForbiddenException('ACTOR_CONTEXT_MISSING');
    }

    return {
      effectiveTenantId,
      actorId: user.sub,
      roles,
      isPlatformAdmin,
    };
  }
}
