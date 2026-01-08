import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantId } from '../common/decorators/tenant.decorator';

@Controller('v1/job-posts')
export class JobPostsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() data: any, @TenantId() tenantId: string) {
    return this.prisma.jobPost.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  @Get()
  async findAll(@TenantId() tenantId: string) {
    return this.prisma.jobPost.findMany({
      where: { tenantId, isActive: true },
      include: { company: true },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.prisma.jobPost.findFirstOrThrow({
      where: { id, tenantId },
      include: { company: true },
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any, @TenantId() tenantId: string) {
    const job = await this.prisma.jobPost.findUnique({ where: { id } });
    if (!job || job.tenantId !== tenantId) {
        throw new Error('Job Post not found');
    }
    return this.prisma.jobPost.update({
        where: { id },
        data
    });
  }

  @Post(':id/apply')
  async apply(@Param('id') jobPostId: string, @Body() data: any, @TenantId() tenantId: string) {
    // data should contain studentId (extracted from token in real implementation)
    // For now assuming data.studentId
    return this.prisma.application.create({
      data: {
        jobPostId,
        studentId: data.studentId,
        tenantId,
        resumeUrl: data.resumeUrl,
        coverLetter: data.coverLetter,
      },
    });
  }
}
