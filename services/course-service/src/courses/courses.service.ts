import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

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
      where: { tenantId },
      include: { program: true },
    });
  }
}
