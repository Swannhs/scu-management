import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  department: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('findOne throws when department is missing', async () => {
    prisma.department.findFirst.mockResolvedValue(null);

    await expect(
      service.findOne('tenant-1', 'department-1'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('passes through partial updates', async () => {
    prisma.department.findFirst.mockResolvedValue({ id: 'department-1' });
    prisma.department.update.mockResolvedValue({ id: 'department-1' });

    await service.update('tenant-1', 'department-1', { headId: 'faculty-1' });

    expect(prisma.department.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { headId: 'faculty-1' },
      }),
    );
  });
});
