import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { DepartmentsService } from './departments.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('v1/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN'] })
  create(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: CreateDepartmentDto,
  ) {
    return this.departmentsService.create(tenantContext.effectiveTenantId, dto);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
  findAll(@TenantContextParam() tenantContext: TenantContext) {
    return this.departmentsService.findAll(tenantContext.effectiveTenantId);
  }
}
