import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  create(tenantId: string, data: CreateSectionDto) {
    return this.prisma.courseOffering.create({
      data: {
        tenantId,
        courseId: data.courseId,
        termId: data.termId,
        sectionName: data.sectionName ?? 'A',
        facultyId: data.facultyId,
        capacity: data.capacity,
      },
    });
  }

  findAll(tenantId: string, termId?: string) {
    return this.prisma.courseOffering.findMany({
      where: {
        tenantId,
        ...(termId ? { termId } : {}),
      },
      include: {
        course: true,
        term: true,
      },
    });
  }

  findById(tenantId: string, sectionId: string) {
    return this.prisma.courseOffering.findFirst({
      where: { tenantId, id: sectionId },
      include: {
        course: true,
        term: true,
      },
    });
  }

  getSessionsForFaculty(tenantId: string, facultyId: string) {
    return this.prisma.courseSession.findMany({
      where: {
        tenantId,
        offering: {
          facultyId,
        },
      },
      include: {
        offering: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        dayOfWeek: 'asc', // Simple ordering
      },
    });
  }

  getFacultySections(tenantId: string, facultyId: string, termId?: string) {
    return this.prisma.courseOffering.findMany({
      where: {
        tenantId,
        facultyId,
        ...(termId ? { termId } : {}),
      },
      include: {
        course: true,
        term: true,
      },
    });
  }

  getSectionRoster(tenantId: string, sectionId: string) {
    return this.prisma.courseEnrollment.findMany({
      where: {
        tenantId,
        courseOfferingId: sectionId,
      },
      include: {
        // In a real app we might fetch student details from student-service via HTTP if not cached/replicated.
        // But enrollment table usually has basic info or we just return studentId and status.
        // Prompt says: "student list + enrollment status".
        // We will return what we have.
      },
    });
  }

  getSectionSchedule(tenantId: string, sectionId: string) {
    return this.prisma.courseSession.findMany({
      where: {
        tenantId,
        courseOfferingId: sectionId,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  getSessionsBySectionIds(tenantId: string, sectionIds: string[]) {
    return this.prisma.courseSession.findMany({
      where: {
        tenantId,
        courseOfferingId: { in: sectionIds },
      },
      include: {
        offering: {
          include: {
            course: true,
            term: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}
