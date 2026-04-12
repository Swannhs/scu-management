import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  jobPost: {
    findFirst: jest.fn(),
  },
  application: {
    findFirst: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  offer: {
    create: jest.fn(),
  },
  eventOutbox: {
    create: jest.fn(),
  },
};

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('rejects duplicate applications', async () => {
    prisma.jobPost.findFirst.mockResolvedValue({ id: 'job-1' });
    prisma.application.findFirst.mockResolvedValue({ id: 'application-1' });

    await expect(
      service.apply('tenant-1', 'student-1', 'job-1', {}),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejects offers for missing applications', async () => {
    prisma.application.findFirst.mockResolvedValue(null);

    await expect(
      service.createOffer('tenant-1', 'application-1', {}),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
