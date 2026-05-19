import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { TenantContext } from '../common/tenant-context';
import { CreateAssessmentCategoryDto } from './dto/create-assessment-category.dto';
import { UpdateAssessmentCategoryDto } from './dto/update-assessment-category.dto';
import { AssessmentTypeDto, CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

const toAssessmentType = (value: AssessmentTypeDto) => value.toUpperCase();

@Injectable()
export class AssessmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories(tenant: TenantContext) {
    return this.prisma.assessmentCategory.findMany({
      where: { tenantId: tenant.effectiveTenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCategory(dto: CreateAssessmentCategoryDto, tenant: TenantContext) {
    const existing = await this.prisma.assessmentCategory.findFirst({
      where: {
        tenantId: tenant.effectiveTenantId,
        name: dto.name,
        deletedAt: null,
      },
    });
    if (existing) throw new ConflictException('Assessment category already exists');

    return this.prisma.assessmentCategory.create({
      data: {
        tenantId: tenant.effectiveTenantId,
        name: dto.name,
        description: dto.description,
        weight: dto.weight,
      },
    });
  }

  async findOneCategory(id: string, tenant: TenantContext) {
    const category = await this.prisma.assessmentCategory.findFirst({
      where: { id, tenantId: tenant.effectiveTenantId, deletedAt: null },
    });
    if (!category) throw new NotFoundException('Assessment category not found');
    return category;
  }

  async updateCategory(id: string, dto: UpdateAssessmentCategoryDto, tenant: TenantContext) {
    await this.findOneCategory(id, tenant);

    if (dto.name) {
      const existing = await this.prisma.assessmentCategory.findFirst({
        where: {
          tenantId: tenant.effectiveTenantId,
          name: dto.name,
          deletedAt: null,
          id: { not: id },
        },
      });
      if (existing) throw new ConflictException('Assessment category already exists');
    }

    return this.prisma.assessmentCategory.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCategory(id: string, tenant: TenantContext) {
    await this.findOneCategory(id, tenant);

    return this.prisma.assessmentCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findAllAssessments(tenant: TenantContext) {
    const isStudent = tenant.actor.roles.includes('STUDENT');

    return this.prisma.exam.findMany({
      where: {
        tenantId: tenant.effectiveTenantId,
        deletedAt: null,
        ...(isStudent ? { status: 'PUBLISHED' } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createAssessment(dto: CreateAssessmentDto, tenant: TenantContext) {
    if (dto.categoryId) {
      await this.findOneCategory(dto.categoryId, tenant);
    }

    if (dto.weight !== undefined) {
      const aggregate = await this.prisma.exam.aggregate({
        where: {
          tenantId: tenant.effectiveTenantId,
          sectionId: dto.sectionId,
          deletedAt: null,
        },
        _sum: { weight: true },
      });
      const existingWeight = Number(aggregate._sum.weight ?? 0);
      if (existingWeight + dto.weight > 100) {
        throw new ConflictException('Total assessment weight cannot exceed 100 for section');
      }
    }

    const effectiveDate = dto.examDate ?? dto.dueDate;
    if (!effectiveDate) {
      throw new ConflictException('Either dueDate or examDate is required');
    }

    return this.prisma.exam.create({
      data: {
        tenantId: tenant.effectiveTenantId,
        title: dto.title,
        description: dto.description,
        courseOfferingId: dto.sectionId,
        sectionId: dto.sectionId,
        categoryId: dto.categoryId,
        assessmentType: toAssessmentType(dto.type) as any,
        status: 'DRAFT',
        startTime: new Date(effectiveDate),
        endTime: new Date(effectiveDate),
        durationMinutes: 0,
        totalMarks: dto.totalMarks,
        weight: dto.weight,
      },
      include: { category: true },
    });
  }

  async findOneAssessment(id: string, tenant: TenantContext) {
    const isStudent = tenant.actor.roles.includes('STUDENT');
    const assessment = await this.prisma.exam.findFirst({
      where: {
        id,
        tenantId: tenant.effectiveTenantId,
        deletedAt: null,
        ...(isStudent ? { status: 'PUBLISHED' } : {}),
      },
      include: { category: true },
    });

    if (!assessment) throw new NotFoundException('Assessment not found');
    return assessment;
  }

  async updateAssessment(id: string, dto: UpdateAssessmentDto, tenant: TenantContext) {
    const assessment = await this.findOneAssessment(id, tenant);

    if (dto.categoryId) {
      await this.findOneCategory(dto.categoryId, tenant);
    }

    if (dto.weight !== undefined) {
      const aggregate = await this.prisma.exam.aggregate({
        where: {
          tenantId: tenant.effectiveTenantId,
          sectionId: dto.sectionId ?? assessment.sectionId ?? assessment.courseOfferingId,
          deletedAt: null,
          id: { not: id },
        },
        _sum: { weight: true },
      });
      const existingWeight = Number(aggregate._sum.weight ?? 0);
      if (existingWeight + dto.weight > 100) {
        throw new ConflictException('Total assessment weight cannot exceed 100 for section');
      }
    }

    return this.prisma.exam.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        categoryId: dto.categoryId,
        sectionId: dto.sectionId,
        courseOfferingId: dto.sectionId,
        assessmentType: dto.type ? (toAssessmentType(dto.type) as any) : undefined,
        totalMarks: dto.totalMarks,
        weight: dto.weight,
        startTime: dto.examDate ? new Date(dto.examDate) : dto.dueDate ? new Date(dto.dueDate) : undefined,
        endTime: dto.examDate ? new Date(dto.examDate) : dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
      include: { category: true },
    });
  }

  async deleteAssessment(id: string, tenant: TenantContext) {
    await this.findOneAssessment(id, tenant);

    return this.prisma.exam.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async publishAssessment(id: string, tenant: TenantContext) {
    await this.findOneAssessment(id, tenant);

    return this.prisma.exam.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        isPublished: true,
      },
      include: { category: true },
    });
  }
}
