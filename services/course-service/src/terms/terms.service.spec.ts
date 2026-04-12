import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TermsService } from './terms.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  academicTerm: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

describe('TermsService', () => {
  let service: TermsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TermsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TermsService>(TermsService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('findOne throws when term is missing', async () => {
    prisma.academicTerm.findFirst.mockResolvedValue(null);

    await expect(service.findOne('tenant-1', 'term-1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates term date fields as dates', async () => {
    prisma.academicTerm.findFirst.mockResolvedValue({ id: 'term-1' });
    prisma.academicTerm.update.mockResolvedValue({ id: 'term-1' });

    await service.update('tenant-1', 'term-1', {
      startDate: '2026-01-01',
      endDate: '2026-05-01',
    });

    expect(prisma.academicTerm.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-05-01'),
        }),
      }),
    );
  });
});
