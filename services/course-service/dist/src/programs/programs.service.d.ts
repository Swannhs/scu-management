import { PrismaService } from '../prisma/prisma.service';
import { Program, ProgramType } from '@prisma/client';
export declare class ProgramsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, data: {
        name: string;
        code: string;
        type: ProgramType;
    }): Promise<Program>;
    findAll(tenantId: string): Promise<Program[]>;
    getStructure(tenantId: string, programId: string): Promise<({
        levels: ({
            offerings: ({
                subject: {
                    name: string;
                    id: string;
                    tenantId: string;
                    code: string;
                    createdAt: Date;
                    updatedAt: Date;
                    credits: number;
                };
                section: {
                    name: string;
                    id: string;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                subjectId: string;
                levelId: string;
                sectionId: string;
                facultyId: string | null;
                academicYear: string;
            })[];
        } & {
            name: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            programId: string;
            sequence: number;
        })[];
    } & {
        name: string;
        id: string;
        tenantId: string;
        code: string;
        type: import("@prisma/client").$Enums.ProgramType;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
