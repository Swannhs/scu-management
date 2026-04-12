import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  course: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

describe('CoursesService', () => {
  let service: CoursesService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('findOne throws when course is missing', async () => {
    prisma.course.findFirst.mockResolvedValue(null);

    await expect(service.findOne('tenant-1', 'course-1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates partial course fields', async () => {
    prisma.course.findFirst.mockResolvedValue({ id: 'course-1' });
    prisma.course.update.mockResolvedValue({ id: 'course-1' });

    await service.update('tenant-1', 'course-1', {
      description: 'Updated syllabus',
    });

    expect(prisma.course.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { description: 'Updated syllabus' },
      }),
    );
  });
});
