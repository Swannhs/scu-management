import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

const PUBLIC_PATHS = ['/health', '/ready'];

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (PUBLIC_PATHS.includes(request.path)) {
      return true;
    }

    const tenantId = request.headers['x-tenant-id'];

    if (!tenantId) {
      throw new BadRequestException('X-Tenant-ID header is required');
    }

    request.tenantId = tenantId;
    return true;
  }
}
