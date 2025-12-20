import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Subject, Section, CourseOffering } from '@prisma/client';

@Injectable()
export class CourseDataService {
    constructor(private prisma: PrismaService) { }

    async createSubject(tenantId: string, data: { name: string; code: string; credits: number }): Promise<Subject> {
        return this.prisma.subject.create({
            data: { ...data, tenantId },
        });
    }

    async createSection(tenantId: string, name: string): Promise<Section> {
        return this.prisma.section.create({
            data: { name, tenantId },
        });
    }

    async createOffering(tenantId: string, data: {
        subjectId: string;
        levelId: string;
        sectionId: string;
        academicYear: string;
        facultyId?: string
    }): Promise<CourseOffering> {
        return this.prisma.courseOffering.create({
            data: { ...data, tenantId },
        });
    }

    async findOfferingsByLevel(tenantId: string, levelId: string) {
        return this.prisma.courseOffering.findMany({
            where: { tenantId, levelId },
            include: {
                subject: true,
                section: true,
            },
        });
    }
}
