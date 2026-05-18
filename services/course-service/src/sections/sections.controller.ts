import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { SectionsService } from './sections.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { AssignFacultyDto } from './dto/assign-faculty.dto';
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

  @Patch(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  update(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sectionId: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(tenantContext.effectiveTenantId, sectionId, dto);
  }

  @Delete(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  remove(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sectionId: string,
  ) {
    return this.sectionsService.softDelete(tenantContext.effectiveTenantId, sectionId);
  }

  @Post(':id/faculty')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  assignFaculty(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sectionId: string,
    @Body() dto: AssignFacultyDto,
  ) {
    return this.sectionsService.assignFaculty(
      tenantContext.effectiveTenantId,
      sectionId,
      dto.facultyId,
    );
  }

  @Delete(':id/faculty/:facultyId')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  unassignFaculty(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sectionId: string,
    @Param('facultyId') facultyId: string,
  ) {
    return this.sectionsService.unassignFaculty(
      tenantContext.effectiveTenantId,
      sectionId,
      facultyId,
    );
  }

  @Get(':id/roster')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  async getRoster(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('id') sectionId: string,
  ) {
    if (user?.realm_access?.roles?.includes('FACULTY') && !user?.realm_access?.roles?.includes('TENANT_ADMIN')) {
      const section = await this.sectionsService.findById(
        tenantContext.effectiveTenantId,
        sectionId,
      );
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
