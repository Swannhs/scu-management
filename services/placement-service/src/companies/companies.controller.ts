import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantId } from '../common/decorators/tenant.decorator';
// import { RolesGuard, Roles } from ... (Simulated for now)

@Controller('v1/companies')
export class CompaniesController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() data: any, @TenantId() tenantId: string) {
    return this.prisma.company.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  @Get()
  async findAll(@TenantId() tenantId: string) {
    return this.prisma.company.findMany({
      where: { tenantId },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.prisma.company.findFirstOrThrow({
      where: { id, tenantId },
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any, @TenantId() tenantId: string) {
    // Verify existence and tenant ownership
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company || company.tenantId !== tenantId) {
        throw new Error('Company not found or access denied');
    }
    return this.prisma.company.update({
      where: { id },
      data,
    });
  }
}
