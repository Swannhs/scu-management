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
}
