import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { SectionsService } from './sections.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { CreateSectionDto } from './dto/create-section.dto';

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
}
