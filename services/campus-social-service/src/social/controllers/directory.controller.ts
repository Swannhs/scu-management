import { Controller, Get, Query } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import type { TenantContext } from '../../common/tenant-context';
import { ProfilesService } from '../services/profiles.service';

@Controller('v1/directory')
export class DirectoryController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('users')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async users(@TenantContextParam() tenantContext: TenantContext, @Query('query') query = '') {
    return this.profilesService.searchUsers(tenantContext.effectiveTenantId, query);
  }
}
