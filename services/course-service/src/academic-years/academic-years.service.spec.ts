import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AcademicYearsService } from './academic-years.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  academicYear: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

describe('AcademicYearsService', () => {
  let service: AcademicYearsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicYearsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AcademicYearsService>(AcademicYearsService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('findOne throws for missing records', async () => {
    prisma.academicYear.findFirst.mockResolvedValue(null);

    await expect(service.findOne('tenant-1', 'year-1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates only provided fields', async () => {
    prisma.academicYear.findFirst.mockResolvedValue({ id: 'year-1' });
    prisma.academicYear.update.mockResolvedValue({ id: 'year-1', name: '2026' });

    await service.update('tenant-1', 'year-1', { name: '2026' });

    expect(prisma.academicYear.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'year-1' },
        data: { name: '2026' },
      }),
    );
  });
});
