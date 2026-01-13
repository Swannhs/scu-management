import { GradingService } from './grading.service';
import { PrismaService } from '../prisma/prisma.service';

const makePrismaMock = () => {
  return {
    exam: { findMany: jest.fn() },
    gradeRule: { findMany: jest.fn() },
    finalGrade: { upsert: jest.fn() },
    studentTranscript: { upsert: jest.fn() },
    $transaction: jest.fn(),
  } as unknown as PrismaService;
};

describe('GradingService', () => {
  it('computes final grades with grade rules', async () => {
    const prisma = makePrismaMock();
    const service = new GradingService(prisma);

    prisma.exam.findMany = jest.fn().mockResolvedValue([
      {
        id: 'exam-1',
        totalMarks: 100,
        weightagePercent: 50,
        marks: [{ studentId: 'student-1', obtainedMarks: 90 }],
      },
      {
        id: 'exam-2',
        totalMarks: 100,
        weightagePercent: 50,
        marks: [{ studentId: 'student-1', obtainedMarks: 80 }],
      },
    ]);
    prisma.gradeRule.findMany = jest.fn().mockResolvedValue([
      { grade: 'A', minPercentage: 85, maxPercentage: 100, gradePoint: 4 },
      { grade: 'B', minPercentage: 70, maxPercentage: 84.99, gradePoint: 3 },
    ]);
    prisma.finalGrade.upsert = jest.fn().mockResolvedValue({});
    prisma.$transaction = jest.fn().mockResolvedValue([]);

    const result = await service.computeFinalGrades('tenant-a', 'section-1', {});

    expect(result).toEqual([
      expect.objectContaining({ studentId: 'student-1', grade: 'A' }),
    ]);
    expect(prisma.finalGrade.upsert).toHaveBeenCalled();
  });
});
