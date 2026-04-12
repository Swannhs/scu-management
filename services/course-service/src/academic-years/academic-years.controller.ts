import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { AcademicYearsService } from './academic-years.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';

@Controller('v1/academic-years')
export class AcademicYearsController {
  constructor(private readonly academicYearsService: AcademicYearsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN'] })
  create(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: CreateAcademicYearDto,
  ) {
    return this.academicYearsService.create(tenantContext.effectiveTenantId, dto);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
  findAll(@TenantContextParam() tenantContext: TenantContext) {
    return this.academicYearsService.findAll(tenantContext.effectiveTenantId);
  }

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
  findOne(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
  ) {
    return this.academicYearsService.findOne(tenantContext.effectiveTenantId, id);
  }

  @Patch(':id')
  @Roles({ roles: ['TENANT_ADMIN'] })
  update(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateAcademicYearDto,
  ) {
    return this.academicYearsService.update(
      tenantContext.effectiveTenantId,
      id,
      dto,
    );
  }
}
