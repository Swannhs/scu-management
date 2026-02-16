import { IsEnum, IsObject } from 'class-validator';

export enum SocialEventType {
  STUDENT_CREATED = 'student.created',
  STUDENT_ENROLLED = 'student.enrolled',
  COURSE_CREATED = 'course.created',
}

export class EventIngestDto {
  @IsEnum(SocialEventType)
  eventType!: SocialEventType;

  @IsObject()
  payload!: Record<string, unknown>;
}
