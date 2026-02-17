import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import type { TenantContext } from '../common/tenant-context';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto, tenantContext: TenantContext) {
    return this.prisma.question.create({
      data: {
        ...createQuestionDto,
        tenantId: tenantContext.effectiveTenantId,
      },
    });
  }

  async findAll(tenantContext: TenantContext) {
    return this.prisma.question.findMany({
      where: {
        tenantId: tenantContext.effectiveTenantId,
        deletedAt: null,
      },
    });
  }

  async findOne(id: string, tenantContext: TenantContext) {
    const question = await this.prisma.question.findFirst({
      where: {
        id,
        tenantId: tenantContext.effectiveTenantId,
        deletedAt: null,
      },
    });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto, tenantContext: TenantContext) {
    await this.findOne(id, tenantContext);

    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: string, tenantContext: TenantContext) {
    await this.findOne(id, tenantContext);

    return this.prisma.question.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
