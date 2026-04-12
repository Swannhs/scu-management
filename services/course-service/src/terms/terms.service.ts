import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';

@Injectable()
export class TermsService {
  constructor(private prisma: PrismaService) {}

  create(tenantId: string, data: CreateTermDto) {
    return this.prisma.academicTerm.create({
      data: {
        tenantId,
        academicYearId: data.academicYearId,
        name: data.name,
        code: data.code,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isActive: data.isActive ?? false,
      },
    });
  }

  findAll(tenantId: string, academicYearId?: string) {
    return this.prisma.academicTerm.findMany({
      where: {
        tenantId,
        deletedAt: null,
        ...(academicYearId ? { academicYearId } : {}),
      },
      include: { academicYear: true },
    });
  }

  async findOne(tenantId: string, id: string) {
    const term = await this.prisma.academicTerm.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { academicYear: true },
    });
    if (!term) {
      throw new NotFoundException('Term not found');
    }
    return term;
  }

  async update(tenantId: string, id: string, data: UpdateTermDto) {
    await this.findOne(tenantId, id);
    return this.prisma.academicTerm.update({
      where: { id },
      data: {
        ...(data.academicYearId !== undefined
          ? { academicYearId: data.academicYearId }
          : {}),
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.code !== undefined ? { code: data.code } : {}),
        ...(data.startDate !== undefined
          ? { startDate: new Date(data.startDate) }
          : {}),
        ...(data.endDate !== undefined ? { endDate: new Date(data.endDate) } : {}),
        ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
      },
      include: { academicYear: true },
    });
  }
}
