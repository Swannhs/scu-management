import { ProgramsService } from './programs.service';
import { ProgramType } from '@prisma/client';
export declare class ProgramsController {
    private readonly programsService;
    constructor(programsService: ProgramsService);
    create(user: any, data: {
        name: string;
        code: string;
        type: ProgramType;
    }): Promise<{
        name: string;
        id: string;
        tenantId: string;
        code: string;
        type: import("@prisma/client").$Enums.ProgramType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(user: any): Promise<{
        name: string;
        id: string;
        tenantId: string;
        code: string;
        type: import("@prisma/client").$Enums.ProgramType;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getStructure(user: any, id: string): Promise<({
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
