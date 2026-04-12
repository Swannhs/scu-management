import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';

@Injectable()
export class AcademicYearsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, data: CreateAcademicYearDto) {
    return this.prisma.academicYear.create({
      data: {
        tenantId,
        name: data.name,
        code: data.code,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isActive: data.isActive ?? false,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.academicYear.findMany({
      where: { tenantId, deletedAt: null },
      include: { terms: true },
    });
  }

  async findOne(tenantId: string, id: string) {
    const year = await this.prisma.academicYear.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { terms: true },
    });
    if (!year) {
      throw new NotFoundException('Academic year not found');
    }
    return year;
  }

  async update(tenantId: string, id: string, data: UpdateAcademicYearDto) {
    await this.findOne(tenantId, id);
    return this.prisma.academicYear.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.code !== undefined ? { code: data.code } : {}),
        ...(data.startDate !== undefined
          ? { startDate: new Date(data.startDate) }
          : {}),
        ...(data.endDate !== undefined ? { endDate: new Date(data.endDate) } : {}),
        ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
      },
      include: { terms: true },
    });
  }
}
