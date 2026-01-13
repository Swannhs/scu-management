import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { CoursesService } from './courses.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('v1/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:REGISTRAR'] })
  create(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: CreateCourseDto,
  ) {
    return this.coursesService.create(tenantContext.effectiveTenantId, dto);
  }

  @Get()
  @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:FACULTY', 'realm:REGISTRAR', 'realm:STAFF'] })
  findAll(@TenantContextParam() tenantContext: TenantContext) {
    return this.coursesService.findAll(tenantContext.effectiveTenantId);
  }
}
