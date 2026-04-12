import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { OffersService } from './offers.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationsService } from '../applications/applications.service';

const mockPrismaService = {
  offer: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  eventOutbox: {
    create: jest.fn(),
  },
};

describe('OffersService', () => {
  let service: OffersService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ApplicationsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OffersService>(OffersService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('prevents accepting another student offer', async () => {
    prisma.offer.findFirst.mockResolvedValue({
      id: 'offer-1',
      application: { studentId: 'student-2' },
    });

    await expect(
      service.acceptOffer('tenant-1', 'student-1', 'offer-1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });
});
