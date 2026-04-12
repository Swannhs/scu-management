import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { JobPostsService } from './job-posts.service';
import { ApplicationsService } from '../applications/applications.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { ApplyJobDto } from '../applications/dto/apply-job.dto';

@Controller('v1/job-posts')
export class JobPostsController {
  constructor(
    private readonly jobPostsService: JobPostsService,
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  async create(
    @Body() data: CreateJobPostDto,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.jobPostsService.create(tenantContext.effectiveTenantId, data);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF', 'STUDENT'] })
  async findAll(@TenantContextParam() tenantContext: TenantContext) {
    return this.jobPostsService.findAll(tenantContext.effectiveTenantId);
  }

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF', 'STUDENT'] })
  async findOne(
    @Param('id') id: string,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.jobPostsService.findOne(tenantContext.effectiveTenantId, id);
  }

  @Post(':id/apply')
  @Roles({ roles: ['STUDENT'] })
  async apply(
    @Param('id') jobPostId: string,
    @Body() data: ApplyJobDto,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.applicationsService.apply(
      tenantContext.effectiveTenantId,
      tenantContext.actorId,
      jobPostId,
      data,
    );
  }
}
