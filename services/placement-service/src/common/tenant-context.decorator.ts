import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TenantContext, TenantContextFactory } from './tenant-context';

export const TenantContextParam = createParamDecorator(
  (_data: unknown, context: ExecutionContext): TenantContext => {
    const request = context.switchToHttp().getRequest<Request & { user?: unknown }>();
    return TenantContextFactory.fromRequest(request.user, request);
  },
);
