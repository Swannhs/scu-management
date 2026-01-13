import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Program } from '@prisma/client';
import { CreateProgramDto } from './dto/create-program.dto';

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
            where: { tenantId },
            include: { department: true, courses: true },
        });
    }

    async getStructure(tenantId: string, programId: string) {
        return this.prisma.program.findFirst({
            where: { id: programId, tenantId },
            include: {
                department: true,
                courses: true,
            },
        });
    }
}
