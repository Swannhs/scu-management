import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Program, ProgramType } from '@prisma/client';

@Injectable()
export class ProgramsService {
    constructor(private prisma: PrismaService) { }

    async create(tenantId: string, data: { name: string; code: string; type: ProgramType }): Promise<Program> {
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
            include: { levels: true },
        });
    }

    async getStructure(tenantId: string, programId: string) {
        return this.prisma.program.findFirst({
            where: { id: programId, tenantId },
            include: {
                levels: {
                    include: {
                        offerings: {
                            include: {
                                subject: true,
                                section: true,
                            },
                        },
                    },
                },
            },
        });
    }
}
