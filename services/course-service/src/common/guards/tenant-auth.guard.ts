import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TenantAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.path === '/' || req.path === '/health') {
      return true;
    }

    const headerTenantId = (req.headers['x-tenant-id'] as string | undefined)?.trim();
    if (!headerTenantId) {
      throw new BadRequestException('X-Tenant-ID header is required');
    }

    const user = req.user;
    if (!user?.sub) {
      throw new UnauthorizedException('Authentication required');
    }

    const tokenTenantId = user.tenant_id as string | undefined;
    if (!tokenTenantId) {
      throw new ForbiddenException('tenant_id claim is required in token');
    }

    const roles: string[] = [
      ...(user?.realm_access?.roles ?? []),
      ...Object.values(user?.resource_access ?? {}).flatMap((resource: any) => resource?.roles ?? []),
    ];
    const isGlobalAdmin = roles.includes('admin') || roles.includes('GLOBAL_ADMIN');

    if (!isGlobalAdmin && headerTenantId !== tokenTenantId) {
      throw new ForbiddenException('X-Tenant-ID does not match token tenant_id');
    }

    req.user = { ...user, userId: user.sub, tenantId: tokenTenantId, roles };
    return true;
  }
}
