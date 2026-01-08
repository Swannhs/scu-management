import { Injectable } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { GroupsService } from './groups.service';

interface StudentCreatedPayload {
  studentId: string;
}

interface StudentEnrolledPayload {
  studentId: string;
  courseOfferingId: string;
}

interface CourseCreatedPayload {
  courseOfferingId: string;
  courseName: string;
}

@Injectable()
export class EventsService {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly groupsService: GroupsService,
  ) {}

  async handleEvent(tenantId: string, eventType: string, payload: Record<string, unknown>) {
    switch (eventType) {
      case 'student.created':
        await this.handleStudentCreated(tenantId, payload as StudentCreatedPayload);
        return { status: 'processed' };
      case 'student.enrolled':
        await this.handleStudentEnrolled(tenantId, payload as StudentEnrolledPayload);
        return { status: 'processed' };
      case 'course.created':
        await this.handleCourseCreated(tenantId, payload as CourseCreatedPayload);
        return { status: 'processed' };
      default:
        return { status: 'ignored' };
    }
  }

  private async handleStudentCreated(tenantId: string, payload: StudentCreatedPayload) {
    await this.profilesService.createDefaultProfile(tenantId, payload.studentId);
  }

  private async handleStudentEnrolled(tenantId: string, payload: StudentEnrolledPayload) {
    await this.groupsService.autoJoinCourseGroup(tenantId, payload.courseOfferingId, payload.studentId);
  }

  private async handleCourseCreated(tenantId: string, payload: CourseCreatedPayload) {
    await this.groupsService.ensureCourseGroup(tenantId, payload.courseOfferingId, payload.courseName);
  }
}
