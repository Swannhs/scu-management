import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TenantContext, TenantContextFactory } from './tenant-context';

export const TenantContextParam = createParamDecorator(
  (requestedTenant: string | undefined, context: ExecutionContext): TenantContext => {
    const request = context.switchToHttp().getRequest<any>();
    return TenantContextFactory.fromRequest(request.user, request, requestedTenant);
  },
);
