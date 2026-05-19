import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { CoursesService } from './courses.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AddPrerequisiteDto } from './dto/add-prerequisite.dto';

@Controller(['v1/courses', 'courses'])
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  create(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: CreateCourseDto,
  ) {
    return this.coursesService.create(tenantContext.effectiveTenantId, dto);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'REGISTRAR', 'STAFF'] })
  findAll(@TenantContextParam() tenantContext: TenantContext) {
    return this.coursesService.findAll(tenantContext.effectiveTenantId);
  }

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'REGISTRAR', 'STAFF'] })
  findOne(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
  ) {
    return this.coursesService.findOne(tenantContext.effectiveTenantId, id);
  }

  @Patch(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  update(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.update(tenantContext.effectiveTenantId, id, dto);
  }

  @Get(':courseId/prerequisites')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'REGISTRAR', 'STAFF'] })
  listPrerequisites(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('courseId') courseId: string,
  ) {
    return this.coursesService.listPrerequisites(
      tenantContext.effectiveTenantId,
      courseId,
    );
  }

  @Post(':courseId/prerequisites')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  addPrerequisite(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('courseId') courseId: string,
    @Body() dto: AddPrerequisiteDto,
  ) {
    return this.coursesService.addPrerequisite(
      tenantContext.effectiveTenantId,
      courseId,
      dto.prerequisiteCourseId,
    );
  }

  @Delete(':courseId/prerequisites/:prerequisiteCourseId')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  removePrerequisite(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('courseId') courseId: string,
    @Param('prerequisiteCourseId') prerequisiteCourseId: string,
  ) {
    return this.coursesService.removePrerequisite(
      tenantContext.effectiveTenantId,
      courseId,
      prerequisiteCourseId,
    );
  }
}
