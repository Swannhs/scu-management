import { Test, TestingModule } from '@nestjs/testing';
import { ExamsService } from './exams.service';
import { PrismaService } from '../prisma/prisma.service';
import type { TenantContext } from '../common/tenant-context';
import { ConflictException } from '@nestjs/common';

describe('ExamsService', () => {
  let service: ExamsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    exam: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    question: {
        findFirst: jest.fn(),
    },
    examQuestion: {
        create: jest.fn(),
    }
  };

  const mockTenantContext: TenantContext = {
    effectiveTenantId: 'tenant-1',
    isGlobalAdmin: false,
    isTenantAdmin: true,
    actor: { roles: [] },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ExamsService>(ExamsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an exam', async () => {
    const dto = {
      title: 'Math Exam',
      courseOfferingId: 'course-1',
      startTime: '2023-01-01T10:00:00Z',
      endTime: '2023-01-01T12:00:00Z',
      durationMinutes: 120,
      totalMarks: 100,
    };

    mockPrismaService.exam.create.mockResolvedValue({ id: 'exam-1', ...dto });

    const result = await service.create(dto, mockTenantContext);
    expect(result).toEqual({ id: 'exam-1', ...dto });
    expect(mockPrismaService.exam.create).toHaveBeenCalledWith({
      data: {
        ...dto,
        tenantId: 'tenant-1',
      },
    });
  });

  it('should throw conflict if start time >= end time', async () => {
    const dto = {
        title: 'Math Exam',
        courseOfferingId: 'course-1',
        startTime: '2023-01-01T13:00:00Z',
        endTime: '2023-01-01T12:00:00Z',
        durationMinutes: 120,
        totalMarks: 100,
      };

      await expect(service.create(dto, mockTenantContext)).rejects.toThrow(ConflictException);
  });
});
