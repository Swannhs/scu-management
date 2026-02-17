import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import { SubmitExamDto } from './dto/submit-exam.dto';
import type { TenantContext } from '../common/tenant-context';
import { OutboxService } from '../outbox/outbox.service';

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
            question: true
          }
        }
      }
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
            studentId
          }
        }
      });

      if (submission && submission.status === 'SUBMITTED') {
        throw new BadRequestException('Exam already submitted');
      }

      let totalObtainedMarks = 0;
      let isFullyGraded = true;

      const answersData: Array<Omit<Prisma.ExamAnswerCreateManyInput, 'submissionId'>> = [];

      for (const answerDto of submitExamDto.answers) {
        const examQuestion = exam.questions.find(eq => eq.questionId === answerDto.questionId);
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
            obtainedMarks
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
          }
        });
      } else {
        submission = await tx.studentExam.update({
          where: { id: submission.id },
          data: {
            status: isFullyGraded ? 'GRADED' : 'SUBMITTED',
            submittedAt: now,
            obtainedMarks: isFullyGraded ? totalObtainedMarks : null,
          }
        });
      }

      await tx.examAnswer.deleteMany({
        where: { submissionId: submission.id }
      });

      await tx.examAnswer.createMany({
        data: answersData.map(a => ({
          ...a,
          submissionId: submission.id
        }))
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
            submission_id: submission.id
          }
        });
      }

      return submission;
    });
  }
}
