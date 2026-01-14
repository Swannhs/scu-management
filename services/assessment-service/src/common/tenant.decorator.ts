import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TenantContextFactory } from './tenant-context';

export const Tenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return TenantContextFactory.fromRequest(request.user, request);
  },
);
