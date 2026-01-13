import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BulkScoreDto } from './dto/bulk-score.dto';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { ComputeFinalGradesDto } from './dto/compute-final-grades.dto';
import { ExamType } from '@prisma/client';

@Injectable()
export class GradingService {
  constructor(private prisma: PrismaService) {}

  createAssessment(tenantId: string, dto: CreateAssessmentDto) {
    return this.prisma.exam.create({
      data: {
        tenantId,
        courseOfferingId: dto.sectionId,
        name: dto.name,
        type: dto.type as ExamType,
        date: new Date(dto.date),
        durationMinutes: dto.durationMinutes ?? 0,
        totalMarks: dto.maxScore,
        weightagePercent: dto.weight,
      },
    });
  }

  async recordScores(tenantId: string, assessmentId: string, dto: BulkScoreDto) {
    const assessment = await this.prisma.exam.findFirst({
      where: { id: assessmentId, tenantId },
    });
    if (!assessment) {
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'Assessment not found',
        details: null,
      });
    }

    const upserts = dto.scores.map((score) =>
      this.prisma.examMark.upsert({
        where: {
          examId_studentId: {
            examId: assessmentId,
            studentId: score.studentId,
          },
        },
        update: {
          obtainedMarks: score.score,
          remarks: score.remarks,
        },
        create: {
          tenantId,
          examId: assessmentId,
          studentId: score.studentId,
          obtainedMarks: score.score,
          remarks: score.remarks,
        },
      }),
    );

    await this.prisma.$transaction(upserts);
    return this.prisma.examMark.findMany({
      where: { tenantId, examId: assessmentId },
    });
  }

  async computeFinalGrades(tenantId: string, sectionId: string, dto: ComputeFinalGradesDto) {
    const assessments = await this.prisma.exam.findMany({
      where: { tenantId, courseOfferingId: sectionId },
      include: { marks: true },
    });

    if (assessments.length === 0) {
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'No assessments found for section',
        details: null,
      });
    }

    const gradeRules = await this.prisma.gradeRule.findMany({
      where: { tenantId },
      orderBy: { minPercentage: 'desc' },
    });

    const studentScores = new Map<string, number>();
    const studentTotals = new Map<string, number>();

    assessments.forEach((assessment) => {
      assessment.marks.forEach((mark) => {
        const percentage = Number(mark.obtainedMarks) / Number(assessment.totalMarks);
        const weightedScore = percentage * Number(assessment.weightagePercent);
        studentScores.set(mark.studentId, (studentScores.get(mark.studentId) ?? 0) + weightedScore);
        studentTotals.set(mark.studentId, (studentTotals.get(mark.studentId) ?? 0) + Number(assessment.weightagePercent));
      });
    });

    const finalGrades = Array.from(studentScores.entries()).map(([studentId, totalWeighted]) => {
      const totalWeight = studentTotals.get(studentId) ?? 1;
      const percentScore = (totalWeighted / totalWeight) * 100;
      const rule = gradeRules.find((gradeRule) =>
        percentScore >= Number(gradeRule.minPercentage) && percentScore <= Number(gradeRule.maxPercentage),
      );

      return {
        studentId,
        percentage: percentScore,
        grade: rule?.grade ?? 'N/A',
        gradePoint: rule?.gradePoint ? Number(rule.gradePoint) : null,
      };
    });

    const upserts = finalGrades.map((grade) =>
      this.prisma.finalGrade.upsert({
        where: {
          tenantId_courseOfferingId_studentId: {
            tenantId,
            courseOfferingId: sectionId,
            studentId: grade.studentId,
          },
        },
        update: {
          percentage: grade.percentage,
          grade: grade.grade,
          gradePoint: grade.gradePoint,
          termId: dto.termId,
        },
        create: {
          tenantId,
          courseOfferingId: sectionId,
          studentId: grade.studentId,
          percentage: grade.percentage,
          grade: grade.grade,
          gradePoint: grade.gradePoint,
          termId: dto.termId,
        },
      }),
    );

    await this.prisma.$transaction(upserts);

    if (dto.termId) {
      const transcriptUpserts = finalGrades.map((grade) => {
        const gpa = grade.gradePoint ?? 0;
        return this.prisma.studentTranscript.upsert({
          where: {
            tenantId_studentId_termId: {
              tenantId,
              studentId: grade.studentId,
              termId: dto.termId,
            },
          },
          update: {
            gpa,
            isFinalized: true,
          },
          create: {
            tenantId,
            studentId: grade.studentId,
            termId: dto.termId,
            gpa,
            isFinalized: true,
          },
        });
      });
      await this.prisma.$transaction(transcriptUpserts);
    }

    return finalGrades;
  }

  async getTranscript(tenantId: string, studentId: string) {
    const finalGrades = await this.prisma.finalGrade.findMany({
      where: { tenantId, studentId },
    });
    const transcripts = await this.prisma.studentTranscript.findMany({
      where: { tenantId, studentId },
    });

    return {
      studentId,
      finalGrades,
      transcripts,
    };
  }
}
