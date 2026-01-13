import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

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
      where: { tenantId },
      include: { terms: true },
    });
  }
}
