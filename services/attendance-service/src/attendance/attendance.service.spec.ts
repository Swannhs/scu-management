import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  attendanceRecord: {
    findMany: jest.fn(),
  },
};

describe('AttendanceService', () => {
  let service: AttendanceService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStudentSummary', () => {
    it('should calculate attendance summary correctly', async () => {
      const tenantId = 'tenant-1';
      const studentId = 'student-1';

      const mockRecords = [
        { status: 'PRESENT', session: { courseOfferingId: 'course-1' } },
        { status: 'PRESENT', session: { courseOfferingId: 'course-1' } },
        { status: 'ABSENT', session: { courseOfferingId: 'course-1' } },
        { status: 'LATE', session: { courseOfferingId: 'course-2' } },
      ];

      (prisma.attendanceRecord.findMany as jest.Mock).mockResolvedValue(mockRecords);

      const result = await service.getStudentSummary(tenantId, studentId);

      expect(result.studentId).toBe(studentId);
      expect(result.overall.total).toBe(4);
      expect(result.overall.present).toBe(2);
      expect(result.overall.absent).toBe(1);
      expect(result.overall.late).toBe(1);
      // (2 + 1) / 4 * 100 = 75%
      expect(result.overall.percentage).toBe(75);

      const course1 = result.byCourse.find(c => c.courseId === 'course-1');
      expect(course1).toBeDefined();
      expect(course1.present).toBe(2);
      expect(course1.absent).toBe(1);
      // (2 + 0) / 3 * 100 = 66.666...
      expect(course1.percentage).toBeCloseTo(66.66, 1);
    });
  });
});
