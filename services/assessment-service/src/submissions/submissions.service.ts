import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import { SubmitExamDto } from './dto/submit-exam.dto';
import type { TenantContext } from '../common/tenant-context';
import { OutboxService } from '../outbox/outbox.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { GradeSubmissionDto } from './dto/grade-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async submit(examId: string, submitExamDto: SubmitExamDto, tenantContext: TenantContext) {
    const studentId = tenantContext.actor.keycloakId;
    if (!studentId) throw new ForbiddenException('User ID not found in token');

    const exam = await this.prisma.exam.findFirst({
      where: { id: examId, tenantId: tenantContext.effectiveTenantId },
      include: {
        questions: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!exam) throw new NotFoundException('Exam not found');

    const now = new Date();
    if (now < exam.startTime || now > exam.endTime) {
      throw new BadRequestException('Exam is not currently active');
    }

    return this.prisma.$transaction(async (tx) => {
      let submission = await tx.studentExam.findUnique({
        where: {
          examId_studentId: {
            examId,
            studentId,
          },
        },
      });

      if (submission && submission.status === 'SUBMITTED') {
        throw new BadRequestException('Exam already submitted');
      }

      let totalObtainedMarks = 0;
      let isFullyGraded = true;

      const answersData: Array<Omit<Prisma.ExamAnswerCreateManyInput, 'submissionId'>> = [];

      for (const answerDto of submitExamDto.answers) {
        const examQuestion = exam.questions.find((eq) => eq.questionId === answerDto.questionId);
        if (!examQuestion) continue;

        const question = examQuestion.question;
        let obtainedMarks = 0;
        let isCorrect = false;

        if (question.type === 'MCQ' || question.type === 'TRUE_FALSE') {
          if (question.correctAnswer && question.correctAnswer === answerDto.answerText) {
            obtainedMarks = examQuestion.marks.toNumber();
            isCorrect = true;
          }
        } else {
          isFullyGraded = false;
          obtainedMarks = 0;
        }

        if (isCorrect) {
          totalObtainedMarks += obtainedMarks;
        }

        answersData.push({
          tenantId: tenantContext.effectiveTenantId,
          questionId: answerDto.questionId,
          answerText: answerDto.answerText,
          isCorrect,
          obtainedMarks,
        });
      }

      if (!submission) {
        submission = await tx.studentExam.create({
          data: {
            tenantId: tenantContext.effectiveTenantId,
            examId,
            studentId,
            status: isFullyGraded ? 'GRADED' : 'SUBMITTED',
            submittedAt: now,
            obtainedMarks: isFullyGraded ? totalObtainedMarks : null,
          },
        });
      } else {
        submission = await tx.studentExam.update({
          where: { id: submission.id },
          data: {
            status: isFullyGraded ? 'GRADED' : 'SUBMITTED',
            submittedAt: now,
            obtainedMarks: isFullyGraded ? totalObtainedMarks : null,
          },
        });
      }

      await tx.examAnswer.deleteMany({
        where: { submissionId: submission.id },
      });

      await tx.examAnswer.createMany({
        data: answersData.map((a) => ({
          ...a,
          submissionId: submission.id,
        })),
      });

      if (isFullyGraded) {
        await this.outbox.createEvent(tx, {
          tenantId: tenantContext.effectiveTenantId,
          eventType: 'ExamGraded',
          payload: {
            exam_id: exam.id,
            student_id: studentId,
            course_offering_id: exam.courseOfferingId,
            obtained_marks: totalObtainedMarks,
            total_marks: exam.totalMarks.toNumber(),
            graded_at: now.toISOString(),
            submission_id: submission.id,
          },
        });
      }

      return submission;
    });
  }

  async listByAssessment(assessmentId: string, tenantContext: TenantContext) {
    await this.ensureAssessmentExists(assessmentId, tenantContext);

    return this.prisma.studentExam.findMany({
      where: {
        examId: assessmentId,
        tenantId: tenantContext.effectiveTenantId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSubmission(assessmentId: string, dto: CreateSubmissionDto, tenantContext: TenantContext) {
    const studentId = tenantContext.actor.keycloakId;
    if (!studentId) throw new ForbiddenException('User ID not found in token');

    const assessment = await this.ensureAssessmentExists(assessmentId, tenantContext);
    if (assessment.status !== 'PUBLISHED') {
      throw new BadRequestException('Assessment is not published');
    }

    const existing = await this.prisma.studentExam.findUnique({
      where: {
        examId_studentId: {
          examId: assessmentId,
          studentId,
        },
      },
    });

    if (existing) throw new ConflictException('Submission already exists');

    return this.prisma.studentExam.create({
      data: {
        tenantId: tenantContext.effectiveTenantId,
        examId: assessmentId,
        studentId,
        status: 'SUBMITTED',
        startedAt: new Date(),
        submittedAt: new Date(),
      },
    });
  }

  async getSubmission(id: string, tenantContext: TenantContext) {
    const submission = await this.prisma.studentExam.findFirst({
      where: { id, tenantId: tenantContext.effectiveTenantId, deletedAt: null },
      include: { exam: true },
    });

    if (!submission) throw new NotFoundException('Submission not found');

    const studentId = tenantContext.actor.keycloakId;
    const isStudent = tenantContext.actor.roles.includes('STUDENT');
    if (isStudent && submission.studentId !== studentId) {
      throw new ForbiddenException('Not allowed to view this submission');
    }

    return submission;
  }

  async updateSubmission(id: string, dto: UpdateSubmissionDto, tenantContext: TenantContext) {
    const submission = await this.getSubmission(id, tenantContext);

    if (submission.status === 'GRADED') {
      throw new ConflictException('Cannot update graded submission');
    }

    return this.prisma.studentExam.update({
      where: { id },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  async gradeSubmission(id: string, dto: GradeSubmissionDto, tenantContext: TenantContext) {
    const submission = await this.getSubmission(id, tenantContext);
    const assessment = await this.ensureAssessmentExists(submission.examId, tenantContext);

    if (dto.marksAwarded > Number(assessment.totalMarks)) {
      throw new BadRequestException('marksAwarded cannot exceed totalMarks');
    }

    return this.prisma.studentExam.update({
      where: { id },
      data: {
        status: 'GRADED',
        obtainedMarks: dto.marksAwarded,
      },
    });
  }

  private async ensureAssessmentExists(assessmentId: string, tenantContext: TenantContext) {
    const assessment = await this.prisma.exam.findFirst({
      where: {
        id: assessmentId,
        tenantId: tenantContext.effectiveTenantId,
        deletedAt: null,
      },
    });

    if (!assessment) throw new NotFoundException('Assessment not found');
    return assessment;
  }
}
