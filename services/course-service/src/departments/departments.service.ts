import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

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
      where: { tenantId },
      include: { programs: true },
    });
  }
}
