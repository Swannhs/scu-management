import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'] || request.user?.tenantId;
    if (!tenantId) {
      throw new UnauthorizedException('Tenant Context Missing');
    }
    return tenantId;
  },
);
