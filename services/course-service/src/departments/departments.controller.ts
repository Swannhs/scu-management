import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { DepartmentsService } from './departments.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

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

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
  findOne(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
  ) {
    return this.departmentsService.findOne(tenantContext.effectiveTenantId, id);
  }

  @Patch(':id')
  @Roles({ roles: ['TENANT_ADMIN'] })
  update(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(
      tenantContext.effectiveTenantId,
      id,
      dto,
    );
  }
}
