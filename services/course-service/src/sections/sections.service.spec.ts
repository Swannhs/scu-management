import { Test, TestingModule } from '@nestjs/testing';
import { SectionsService } from './sections.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  courseOffering: {
    findMany: jest.fn(),
  },
  courseEnrollment: {
    findMany: jest.fn(),
  },
  courseSession: {
    findMany: jest.fn(),
  },
};

describe('SectionsService', () => {
  let service: SectionsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SectionsService>(SectionsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFacultySections', () => {
    it('should return sections for faculty', async () => {
      const tenantId = 'tenant-1';
      const facultyId = 'faculty-1';
      const mockSections = [{ id: 'section-1', facultyId }];

      (prisma.courseOffering.findMany as jest.Mock).mockResolvedValue(mockSections);

      const result = await service.getFacultySections(tenantId, facultyId);
      expect(result).toEqual(mockSections);
      expect(prisma.courseOffering.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { tenantId, facultyId },
      }));
    });
  });

  describe('getSectionRoster', () => {
    it('should return enrollment list', async () => {
      const tenantId = 'tenant-1';
      const sectionId = 'section-1';
      const mockEnrollments = [{ studentId: 'student-1', status: 'ENROLLED' }];

      (prisma.courseEnrollment.findMany as jest.Mock).mockResolvedValue(mockEnrollments);

      const result = await service.getSectionRoster(tenantId, sectionId);
      expect(result).toEqual(mockEnrollments);
    });
  });

  describe('getSectionSchedule', () => {
    it('should return session list', async () => {
      const tenantId = 'tenant-1';
      const sectionId = 'section-1';
      const mockSessions = [{ id: 'session-1', dayOfWeek: 'MONDAY' }];

      (prisma.courseSession.findMany as jest.Mock).mockResolvedValue(mockSessions);

      const result = await service.getSectionSchedule(tenantId, sectionId);
      expect(result).toEqual(mockSessions);
    });
  });
});
