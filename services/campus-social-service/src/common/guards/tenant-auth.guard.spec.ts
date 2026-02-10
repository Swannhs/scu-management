import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TenantAuthGuard } from './tenant-auth.guard';

describe('TenantAuthGuard', () => {
  const guard = new TenantAuthGuard();

  function contextFor(req: any): ExecutionContext {
    return {
      switchToHttp: () => ({ getRequest: () => req }),
    } as ExecutionContext;
  }

  it('returns 401 when user missing', () => {
    const req = { path: '/v1/profiles/me', headers: { 'x-tenant-id': 't1' } };
    expect(() => guard.canActivate(contextFor(req))).toThrow(UnauthorizedException);
  });

  it('returns 403 when tenant header mismatches token', () => {
    const req = {
      path: '/v1/profiles/me',
      headers: { 'x-tenant-id': 't2' },
      user: { sub: 'u1', tenant_id: 't1', realm_access: { roles: [] } },
    };
    expect(() => guard.canActivate(contextFor(req))).toThrow('X-Tenant-ID does not match token tenant_id');
  });
});
