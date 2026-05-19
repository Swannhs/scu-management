import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(tenantId: string, data: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        tenantId,
        programId: data.programId,
        name: data.name,
        code: data.code,
        credits: data.credits ?? 0,
        description: data.description,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.course.findMany({
      where: { tenantId, deletedAt: null },
      include: { program: true },
    });
  }

  async findOne(tenantId: string, id: string) {
    const course = await this.prisma.course.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { program: true },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(tenantId: string, id: string, data: UpdateCourseDto) {
    await this.findOne(tenantId, id);
    return this.prisma.course.update({
      where: { id },
      data: {
        ...(data.programId !== undefined ? { programId: data.programId } : {}),
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.code !== undefined ? { code: data.code } : {}),
        ...(data.credits !== undefined ? { credits: data.credits } : {}),
        ...(data.description !== undefined
          ? { description: data.description }
          : {}),
      },
      include: { program: true },
    });
  }

  async listPrerequisites(tenantId: string, courseId: string) {
    await this.findOne(tenantId, courseId);

    return this.prisma.coursePrerequisite.findMany({
      where: { tenantId, courseId },
      include: {
        prerequisiteCourse: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addPrerequisite(
    tenantId: string,
    courseId: string,
    prerequisiteCourseId: string,
  ) {
    await this.findOne(tenantId, courseId);
    await this.findOne(tenantId, prerequisiteCourseId);

    if (courseId === prerequisiteCourseId) {
      throw new BadRequestException('A course cannot be its own prerequisite');
    }

    const existing = await this.prisma.coursePrerequisite.findFirst({
      where: {
        tenantId,
        courseId,
        prerequisiteCourseId,
      },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Prerequisite already exists for this course');
    }

    return this.prisma.coursePrerequisite.create({
      data: {
        tenantId,
        courseId,
        prerequisiteCourseId,
      },
      include: {
        prerequisiteCourse: true,
      },
    });
  }

  async removePrerequisite(
    tenantId: string,
    courseId: string,
    prerequisiteCourseId: string,
  ) {
    await this.findOne(tenantId, courseId);
    await this.findOne(tenantId, prerequisiteCourseId);

    const existing = await this.prisma.coursePrerequisite.findFirst({
      where: {
        tenantId,
        courseId,
        prerequisiteCourseId,
      },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException('Prerequisite not found');
    }

    return this.prisma.coursePrerequisite.delete({
      where: { id: existing.id },
    });
  }
}
