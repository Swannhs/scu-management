import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('v1/students')
export class StudentsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.student.findMany();
  }

  @Post()
  async create(@Body() data: any) {
    return this.prisma.student.create({ data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      return this.prisma.student.findUnique({ where: { id } });
  }
}
