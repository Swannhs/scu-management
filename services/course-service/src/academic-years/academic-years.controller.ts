import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { AcademicYearsService } from './academic-years.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

@Controller('v1/academic-years')
export class AcademicYearsController {
  constructor(private readonly academicYearsService: AcademicYearsService) {}

  @Post()
  @Roles({ roles: ['realm:TENANT_ADMIN'] })
  create(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: CreateAcademicYearDto,
  ) {
    return this.academicYearsService.create(tenantContext.effectiveTenantId, dto);
  }

  @Get()
  @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:STAFF', 'realm:FACULTY'] })
  findAll(@TenantContextParam() tenantContext: TenantContext) {
    return this.academicYearsService.findAll(tenantContext.effectiveTenantId);
  }
}
