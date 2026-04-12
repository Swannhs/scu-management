import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('v1/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  async create(
    @Body() data: CreateCompanyDto,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.companiesService.create(tenantContext.effectiveTenantId, data);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF', 'STUDENT'] })
  async findAll(@TenantContextParam() tenantContext: TenantContext) {
    return this.companiesService.findAll(tenantContext.effectiveTenantId);
  }

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF', 'STUDENT'] })
  async findOne(
    @Param('id') id: string,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.companiesService.findOne(tenantContext.effectiveTenantId, id);
  }

  @Put(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCompanyDto,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.companiesService.update(tenantContext.effectiveTenantId, id, data);
  }
}
