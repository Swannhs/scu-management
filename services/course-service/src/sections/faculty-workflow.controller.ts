import { Controller, Get, Query } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { SectionsService } from './sections.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { KeycloakUser } from '../common/keycloak-user.interface';

@Controller('v1/faculty')
export class FacultyWorkflowController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get('me/sections')
  @Roles({ roles: ['FACULTY'] })
  getMySections(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Query('termId') termId?: string,
  ) {
    return this.sectionsService.getFacultySections(tenantContext.effectiveTenantId, user.sub, termId);
  }
}
