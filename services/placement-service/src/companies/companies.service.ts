import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  create(tenantId: string, data: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        tenantId,
        ...data,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.company.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const company = await this.prisma.company.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(tenantId: string, id: string, data: UpdateCompanyDto) {
    await this.findOne(tenantId, id);
    return this.prisma.company.update({
      where: { id },
      data,
    });
  }
}
