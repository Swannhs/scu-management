import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // In real app, extracting from JWT/Request populated by AuthGuard
    // Mocking for now if AuthGuard not active, but assuming it returns user object
    return request.user || { sub: 'mock-user-id', roles: [] };
  },
);
