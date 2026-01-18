import { Test, TestingModule } from '@nestjs/testing';
import { GradingService } from './grading.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  studentTranscript: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
  },
  examMark: {
    findMany: jest.fn(),
  },
};

describe('GradingService', () => {
  let service: GradingService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GradingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<GradingService>(GradingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStudentPerformance', () => {
    it('should return performance summary and flags', async () => {
      const tenantId = 'tenant-1';
      const studentId = 'student-1';

      (prisma.studentTranscript.findFirst as jest.Mock).mockResolvedValue({
        gpa: { toNumber: () => 1.5 }, // Low GPA
        cgpa: { toNumber: () => 2.0 },
        totalCredits: { toNumber: () => 15 },
        termId: 'term-1',
      });

      (prisma.examMark.findMany as jest.Mock).mockResolvedValue([
        {
          examId: 'exam-1',
          obtainedMarks: { toNumber: () => 40 },
          exam: {
            name: 'Math Midterm',
            totalMarks: { toNumber: () => 100 },
          },
        },
      ]);

      const result = await service.getStudentPerformance(tenantId, studentId);

      expect(result.studentId).toBe(studentId);
      expect(result.summary.gpa).toBe(1.5);
      expect(result.flags).toContain('LOW_GPA');
      expect(result.flags).toContain('RECENT_FAILING_GRADES'); // 40/100 < 50%
      expect(result.recent.length).toBe(1);
      expect(result.recent[0].percentage).toBe(40);
    });
  });
});
