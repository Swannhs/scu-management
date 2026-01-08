import { createParamDecorator, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headerTenant = request.headers['x-tenant-id'];
    const tokenTenant = request.user?.tenantId; // Assuming AuthGuard populates request.user

    if (!headerTenant && !tokenTenant) {
      throw new UnauthorizedException({ code: 'MISSING_TENANT_CONTEXT', message: 'Tenant Context Missing' });
    }

    if (headerTenant && tokenTenant && headerTenant !== tokenTenant) {
      throw new ForbiddenException({ code: 'TENANT_CONTEXT_MISMATCH', message: 'Token tenant does not match header' });
    }

    // Prefer header if present, else token
    return headerTenant || tokenTenant;
  },
);
