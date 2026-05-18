import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  create(tenantId: string, data: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.department.findMany({
      where: { tenantId, deletedAt: null },
      include: { programs: true },
    });
  }

  async findOne(tenantId: string, id: string) {
    const department = await this.prisma.department.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { programs: true },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async update(tenantId: string, id: string, data: UpdateDepartmentDto) {
    await this.findOne(tenantId, id);
    return this.prisma.department.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.code !== undefined ? { code: data.code } : {}),
        ...(data.headId !== undefined ? { headId: data.headId } : {}),
      },
      include: { programs: true },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.department.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: { programs: true },
    });
  }
}
