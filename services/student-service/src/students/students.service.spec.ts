import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

const mockPrismaService = {
  student: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
  },
};

describe('StudentsService', () => {
  let service: StudentsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return students and total count for the specific tenant', async () => {
      const tenantId = 'tenant-1';
      const expectedStudents = [{ id: '1', tenantId }];
      const total = 1;

      prisma.student.findMany.mockResolvedValue(expectedStudents as any);
      prisma.student.count.mockResolvedValue(total);

      const result = await service.findAll(tenantId);

      expect(result).toEqual({
        data: expectedStudents,
        total,
        page: 1,
        limit: 10,
      });

      expect(prisma.student.findMany).toHaveBeenCalledWith({
        where: { tenantId },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.student.count).toHaveBeenCalledWith({
        where: { tenantId },
      });
    });
  });

  describe('create', () => {
    it('should create a student with the correct tenantId', async () => {
      const tenantId = 'tenant-1';
      const dto: CreateStudentDto = {
        studentId: 'S123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      };

      prisma.student.findFirst.mockResolvedValue(null);

      prisma.student.create.mockResolvedValue({
        id: '1',
        ...dto,
        tenantId,
      } as any);

      const result = await service.create(tenantId, dto);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const receivedTenantId: string = (result as any).tenantId;
      expect(receivedTenantId).toEqual(tenantId);

      // Use expect.objectContaining inside toHaveBeenCalledWith safely
      // We know prisma.student.create takes an object with data property
      expect(prisma.student.create).toHaveBeenCalledWith(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: expect.objectContaining({ tenantId, ...dto }),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if student is not found in tenant', async () => {
      const tenantId = 'tenant-1';
      const id = '1';
      prisma.student.findFirst.mockResolvedValue(null);

      await expect(service.findOne(tenantId, id)).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.student.findFirst).toHaveBeenCalledWith({
        where: { id, tenantId },
      });
    });
  });
});
