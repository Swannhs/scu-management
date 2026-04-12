import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  program: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

describe('ProgramsService', () => {
  let service: ProgramsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProgramsService>(ProgramsService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('findOne throws when program is missing', async () => {
    prisma.program.findFirst.mockResolvedValue(null);

    await expect(service.findOne('tenant-1', 'program-1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates provided program fields', async () => {
    prisma.program.findFirst.mockResolvedValue({ id: 'program-1' });
    prisma.program.update.mockResolvedValue({ id: 'program-1' });

    await service.update('tenant-1', 'program-1', { durationMonths: 48 });

    expect(prisma.program.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { durationMonths: 48 },
      }),
    );
  });
});
