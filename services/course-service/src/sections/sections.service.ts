import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, data: CreateSectionDto) {
    await this.ensureCourseExists(tenantId, data.courseId);
    await this.ensureTermExists(tenantId, data.termId);

    const sectionName = data.sectionName ?? 'A';
    const duplicate = await this.prisma.courseOffering.findFirst({
      where: {
        tenantId,
        termId: data.termId,
        courseId: data.courseId,
        sectionName,
        deletedAt: null,
      },
      select: { id: true },
    });

    if (duplicate) {
      throw new ConflictException('Section already exists for this course and term');
    }

    return this.prisma.courseOffering.create({
      data: {
        tenantId,
        courseId: data.courseId,
        termId: data.termId,
        sectionName,
        facultyId: data.facultyId,
        capacity: data.capacity,
      },
      include: {
        course: true,
        term: true,
      },
    });
  }

  findAll(tenantId: string, termId?: string) {
    return this.prisma.courseOffering.findMany({
      where: {
        tenantId,
        deletedAt: null,
        ...(termId ? { termId } : {}),
      },
      include: {
        course: true,
        term: true,
      },
    });
  }

  async findById(tenantId: string, sectionId: string) {
    const section = await this.prisma.courseOffering.findFirst({
      where: { tenantId, id: sectionId, deletedAt: null },
      include: {
        course: true,
        term: true,
      },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return section;
  }

  async update(tenantId: string, sectionId: string, data: UpdateSectionDto) {
    const existing = await this.findById(tenantId, sectionId);

    const nextCourseId = data.courseId ?? existing.courseId;
    const nextTermId = data.termId ?? existing.termId;
    const nextSectionName = data.sectionName ?? existing.sectionName;

    if (data.courseId) {
      await this.ensureCourseExists(tenantId, data.courseId);
    }
    if (data.termId) {
      await this.ensureTermExists(tenantId, data.termId);
    }

    const duplicate = await this.prisma.courseOffering.findFirst({
      where: {
        tenantId,
        courseId: nextCourseId,
        termId: nextTermId,
        sectionName: nextSectionName,
        deletedAt: null,
        id: { not: sectionId },
      },
      select: { id: true },
    });

    if (duplicate) {
      throw new ConflictException('Section already exists for this course and term');
    }

    return this.prisma.courseOffering.update({
      where: { id: sectionId },
      data: {
        ...(data.courseId !== undefined ? { courseId: data.courseId } : {}),
        ...(data.termId !== undefined ? { termId: data.termId } : {}),
        ...(data.sectionName !== undefined ? { sectionName: data.sectionName } : {}),
        ...(data.facultyId !== undefined ? { facultyId: data.facultyId } : {}),
        ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
      },
      include: {
        course: true,
        term: true,
      },
    });
  }

  async softDelete(tenantId: string, sectionId: string) {
    await this.findById(tenantId, sectionId);
    return this.prisma.courseOffering.update({
      where: { id: sectionId },
      data: { deletedAt: new Date() },
    });
  }

  async assignFaculty(tenantId: string, sectionId: string, facultyId: string) {
    await this.findById(tenantId, sectionId);
    return this.prisma.courseOffering.update({
      where: { id: sectionId },
      data: { facultyId },
      include: {
        course: true,
        term: true,
      },
    });
  }

  async unassignFaculty(tenantId: string, sectionId: string, facultyId: string) {
    const section = await this.findById(tenantId, sectionId);

    if (section.facultyId && section.facultyId !== facultyId) {
      throw new NotFoundException('Faculty assignment not found for this section');
    }

    return this.prisma.courseOffering.update({
      where: { id: sectionId },
      data: { facultyId: null },
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
        dayOfWeek: 'asc',
      },
    });
  }

  getFacultySections(tenantId: string, facultyId: string, termId?: string) {
    return this.prisma.courseOffering.findMany({
      where: {
        tenantId,
        facultyId,
        deletedAt: null,
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
        deletedAt: null,
      },
    });
  }

  getSectionSchedule(tenantId: string, sectionId: string) {
    return this.prisma.courseSession.findMany({
      where: {
        tenantId,
        courseOfferingId: sectionId,
        deletedAt: null,
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
        deletedAt: null,
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

  private async ensureCourseExists(tenantId: string, courseId: string) {
    const course = await this.prisma.course.findFirst({
      where: { tenantId, id: courseId, deletedAt: null },
      select: { id: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }
  }

  private async ensureTermExists(tenantId: string, termId: string) {
    const term = await this.prisma.academicTerm.findFirst({
      where: { tenantId, id: termId, deletedAt: null },
      select: { id: true },
    });

    if (!term) {
      throw new NotFoundException('Term not found');
    }
  }
}
