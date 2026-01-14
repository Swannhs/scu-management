import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { AddQuestionDto } from './dto/add-question.dto';
import { TenantContext } from '../common/tenant-context';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExamDto: CreateExamDto, tenantContext: TenantContext) {
    if (new Date(createExamDto.startTime) >= new Date(createExamDto.endTime)) {
      throw new ConflictException('Start time must be before end time');
    }

    return this.prisma.exam.create({
      data: {
        ...createExamDto,
        tenantId: tenantContext.effectiveTenantId,
      },
    });
  }

  async findAll(tenantContext: TenantContext) {
    return this.prisma.exam.findMany({
      where: {
        tenantId: tenantContext.effectiveTenantId,
        deletedAt: null,
      },
    });
  }

  async findOne(id: string, tenantContext: TenantContext) {
    const exam = await this.prisma.exam.findFirst({
      where: {
        id,
        tenantId: tenantContext.effectiveTenantId,
        deletedAt: null,
      },
      include: {
        questions: {
          include: {
            question: true
          },
          orderBy: {
            sequenceOrder: 'asc'
          }
        }
      }
    });
    if (!exam) throw new NotFoundException('Exam not found');
    return exam;
  }

  async addQuestion(examId: string, addQuestionDto: AddQuestionDto, tenantContext: TenantContext) {
    await this.findOne(examId, tenantContext);

    const question = await this.prisma.question.findFirst({
      where: {
        id: addQuestionDto.questionId,
        tenantId: tenantContext.effectiveTenantId,
        deletedAt: null,
      },
    });
    if (!question) throw new NotFoundException('Question not found');

    return this.prisma.examQuestion.create({
      data: {
        tenantId: tenantContext.effectiveTenantId,
        examId,
        ...addQuestionDto
      }
    });
  }
}
