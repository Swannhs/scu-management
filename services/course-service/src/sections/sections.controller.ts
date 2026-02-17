import { Body, Controller, ForbiddenException, Get, Param, Post, Query } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { SectionsService } from './sections.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateSectionDto } from './dto/create-section.dto';
import type { KeycloakUser } from '../common/keycloak-user.interface';

@Controller('v1/sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  create(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: CreateSectionDto,
  ) {
    return this.sectionsService.create(tenantContext.effectiveTenantId, dto);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'REGISTRAR', 'STAFF'] })
  findAll(
    @TenantContextParam() tenantContext: TenantContext,
    @Query('termId') termId?: string,
  ) {
    return this.sectionsService.findAll(tenantContext.effectiveTenantId, termId);
  }

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'REGISTRAR', 'STAFF'] })
  findOne(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sectionId: string,
  ) {
    return this.sectionsService.findById(tenantContext.effectiveTenantId, sectionId);
  }

  @Get(':id/roster')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  async getRoster(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('id') sectionId: string,
  ) {
    if (user?.realm_access?.roles?.includes('FACULTY') && !user?.realm_access?.roles?.includes('TENANT_ADMIN')) {
      const section = await this.sectionsService.findById(tenantContext.effectiveTenantId, sectionId);
      if (!section || section.facultyId !== user.sub) {
        throw new ForbiddenException('FORBIDDEN');
      }
    }
    return this.sectionsService.getSectionRoster(tenantContext.effectiveTenantId, sectionId);
  }

  @Get(':id/schedule')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR', 'STUDENT'] })
  getSchedule(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sectionId: string,
  ) {
    return this.sectionsService.getSectionSchedule(tenantContext.effectiveTenantId, sectionId);
  }
}
