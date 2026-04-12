import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Program } from '@prisma/client';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
    constructor(private prisma: PrismaService) { }

    async create(tenantId: string, data: CreateProgramDto): Promise<Program> {
        return this.prisma.program.create({
            data: {
                ...data,
                tenantId,
            },
        });
    }

    async findAll(tenantId: string): Promise<Program[]> {
        return this.prisma.program.findMany({
            where: { tenantId, deletedAt: null },
            include: { department: true, courses: true },
        });
    }

    async findOne(tenantId: string, programId: string) {
        const program = await this.prisma.program.findFirst({
            where: { id: programId, tenantId, deletedAt: null },
            include: { department: true, courses: true },
        });
        if (!program) {
            throw new NotFoundException('Program not found');
        }
        return program;
    }

    async getStructure(tenantId: string, programId: string) {
        return this.prisma.program.findFirst({
            where: { id: programId, tenantId, deletedAt: null },
            include: {
                department: true,
                courses: true,
            },
        });
    }

    async update(tenantId: string, programId: string, data: UpdateProgramDto) {
        await this.findOne(tenantId, programId);
        return this.prisma.program.update({
            where: { id: programId },
            data: {
                ...(data.departmentId !== undefined
                    ? { departmentId: data.departmentId }
                    : {}),
                ...(data.name !== undefined ? { name: data.name } : {}),
                ...(data.code !== undefined ? { code: data.code } : {}),
                ...(data.degreeLevel !== undefined
                    ? { degreeLevel: data.degreeLevel }
                    : {}),
                ...(data.durationMonths !== undefined
                    ? { durationMonths: data.durationMonths }
                    : {}),
            },
            include: { department: true, courses: true },
        });
    }
}
