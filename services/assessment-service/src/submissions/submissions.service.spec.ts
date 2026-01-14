import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionsService } from './submissions.service';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxService } from '../outbox/outbox.service';
import { TenantContext } from '../common/tenant-context';
import { BadRequestException } from '@nestjs/common';

describe('SubmissionsService', () => {
  let service: SubmissionsService;
  let prisma: PrismaService;
  let outbox: OutboxService;

  const mockPrismaService = {
    exam: {
      findFirst: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrismaService)),
    studentExam: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    },
    examAnswer: {
        deleteMany: jest.fn(),
        createMany: jest.fn(),
    }
  };

  const mockOutboxService = {
    createEvent: jest.fn(),
  };

  const mockTenantContext: TenantContext = {
    effectiveTenantId: 'tenant-1',
    isGlobalAdmin: false,
    isTenantAdmin: false,
    actor: { keycloakId: 'student-1', roles: [] },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: OutboxService, useValue: mockOutboxService },
      ],
    }).compile();

    service = module.get<SubmissionsService>(SubmissionsService);
    prisma = module.get<PrismaService>(PrismaService);
    outbox = module.get<OutboxService>(OutboxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should submit an exam', async () => {
    const examId = 'exam-1';
    const dto = {
      answers: [
        { questionId: 'q-1', answerText: 'A' },
      ],
    };

    const mockExam = {
      id: examId,
      tenantId: 'tenant-1',
      startTime: new Date(Date.now() - 10000), // Active
      endTime: new Date(Date.now() + 10000),
      totalMarks: { toNumber: () => 100 },
      courseOfferingId: 'course-1',
      questions: [
        {
          questionId: 'q-1',
          marks: { toNumber: () => 10 },
          question: {
            id: 'q-1',
            type: 'MCQ',
            correctAnswer: 'A',
          },
        },
      ],
    };

    mockPrismaService.exam.findFirst.mockResolvedValue(mockExam);
    mockPrismaService.studentExam.findUnique.mockResolvedValue(null);
    mockPrismaService.studentExam.create.mockResolvedValue({ id: 'submission-1', status: 'GRADED' });

    const result = await service.submit(examId, dto, mockTenantContext);

    expect(result).toBeDefined();
    expect(mockOutboxService.createEvent).toHaveBeenCalled();
  });
});
