import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Student, StudentStatus } from '@prisma/client';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async create(tenantId: string, data: any): Promise<Student> {
        const existing = await this.prisma.student.findUnique({
            where: { studentId: data.studentId },
        });

        if (existing) {
            throw new ConflictException(`Student with ID ${data.studentId} already exists`);
        }

        return this.prisma.student.create({
            data: {
                ...data,
                tenantId,
            },
        });
    }

    async findAll(tenantId: string): Promise<Student[]> {
        return this.prisma.student.findMany({
            where: { tenantId },
        });
    }

    async findOne(tenantId: string, id: string): Promise<Student | null> {
        return this.prisma.student.findFirst({
            where: { id, tenantId },
        });
    }

    async update(tenantId: string, id: string, data: any): Promise<Student> {
        return this.prisma.student.update({
            where: { id, tenantId },
            data,
        });
    }
}
