import { PrismaService } from '../prisma/prisma.service';
import { Student } from '@prisma/client';
export declare class StudentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, data: any): Promise<Student>;
    findAll(tenantId: string): Promise<Student[]>;
    findOne(tenantId: string, id: string): Promise<Student | null>;
    update(tenantId: string, id: string, data: any): Promise<Student>;
}
