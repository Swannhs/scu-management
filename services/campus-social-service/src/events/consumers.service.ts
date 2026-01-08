import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GroupType, GroupRole } from '@prisma/client';

@Injectable()
export class EventsConsumerService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    // In production, connect to RabbitMQ here
    // this.rabbit.subscribe('student.created', this.handleStudentCreated.bind(this));
    // this.rabbit.subscribe('course.created', this.handleCourseCreated.bind(this));
    // this.rabbit.subscribe('student.enrolled', this.handleStudentEnrolled.bind(this));
  }

  async handleStudentCreated(payload: any) {
    // payload: { tenantId, id (userId), ... }
    await this.prisma.publicProfile.create({
        data: {
            tenantId: payload.tenantId,
            userId: payload.id,
            privacy: 'PUBLIC'
        }
    });
  }

  async handleCourseCreated(payload: any) {
    // payload: { tenantId, id (courseId), title }
    await this.prisma.group.create({
        data: {
            tenantId: payload.tenantId,
            name: payload.title,
            type: GroupType.COURSE,
            id: payload.id, // Use course ID as Group ID or map it
            visibility: 'PRIVATE'
        }
    });
  }

  async handleStudentEnrolled(payload: any) {
    // payload: { tenantId, studentId, courseId }
    // Find group for course
    const group = await this.prisma.group.findFirst({
        where: { tenantId: payload.tenantId, type: GroupType.COURSE, name: payload.courseId } // Simplified mapping
    });
    if (group) {
        await this.prisma.groupMember.create({
            data: {
                tenantId: payload.tenantId,
                groupId: group.id,
                userId: payload.studentId,
                role: GroupRole.MEMBER
            }
        });
    }
  }
}
