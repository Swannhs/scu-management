import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TermsService } from './terms.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';

@Controller('v1/terms')
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN'] })
  create(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: CreateTermDto,
  ) {
    return this.termsService.create(tenantContext.effectiveTenantId, dto);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
  findAll(
    @TenantContextParam() tenantContext: TenantContext,
    @Query('academicYearId') academicYearId?: string,
  ) {
    return this.termsService.findAll(tenantContext.effectiveTenantId, academicYearId);
  }

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
  findOne(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
  ) {
    return this.termsService.findOne(tenantContext.effectiveTenantId, id);
  }

  @Patch(':id')
  @Roles({ roles: ['TENANT_ADMIN'] })
  update(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateTermDto,
  ) {
    return this.termsService.update(tenantContext.effectiveTenantId, id, dto);
  }
}
