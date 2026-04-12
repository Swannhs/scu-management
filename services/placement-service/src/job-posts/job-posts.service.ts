import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';

@Injectable()
export class JobPostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, data: CreateJobPostDto) {
    const company = await this.prisma.company.findFirst({
      where: { id: data.companyId, tenantId, deletedAt: null },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.prisma.jobPost.create({
      data: {
        tenantId,
        companyId: data.companyId,
        title: data.title,
        description: data.description,
        jobType: data.jobType,
        location: data.location,
        salaryRange: data.salaryRange,
        eligibilityCriteria: data.eligibilityCriteria,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
        isActive: data.isActive ?? true,
      },
      include: { company: true },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.jobPost.findMany({
      where: { tenantId, deletedAt: null, isActive: true },
      include: { company: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const jobPost = await this.prisma.jobPost.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { company: true },
    });
    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }
    return jobPost;
  }
}
