import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Student } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, data: CreateStudentDto): Promise<Student> {
    const existing = await this.prisma.student.findFirst({
      where: {
        studentId: data.studentId,
        // Enforce global uniqueness if required by logic, but schema has @unique on studentId.
        // If studentId is only unique within tenant, we need schema change.
        // Assuming global uniqueness for now.
      },
    });

    if (existing) {
      // If it exists, regardless of tenant, it's a conflict based on current schema.
      // If we want to check if it's in the SAME tenant to give a better error:
      if (existing.tenantId === tenantId) {
        throw new ConflictException(
          `Student with ID ${data.studentId} already exists in this tenant`,
        );
      }
      throw new ConflictException(
        `Student with ID ${data.studentId} already exists`,
      );
    }

    return this.prisma.student.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  async findAll(
    tenantId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Student[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.student.findMany({
        where: { tenantId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.student.count({
        where: { tenantId },
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(tenantId: string, id: string): Promise<Student> {
    const student = await this.prisma.student.findFirst({
      where: { id, tenantId },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async update(
    tenantId: string,
    id: string,
    data: UpdateStudentDto,
  ): Promise<Student> {
    const existing = await this.prisma.student.findFirst({
      where: { id, tenantId },
    });

    if (!existing) {
      throw new NotFoundException(
        `Student with ID ${id} not found in this tenant`,
      );
    }

    return this.prisma.student.update({
      where: { id },
      data,
    });
  }

  async remove(tenantId: string, id: string): Promise<void> {
    const existing = await this.prisma.student.findFirst({
      where: { id, tenantId },
    });

    if (!existing) {
      throw new NotFoundException(
        `Student with ID ${id} not found in this tenant`,
      );
    }

    await this.prisma.student.delete({
      where: { id },
    });
  }
}
