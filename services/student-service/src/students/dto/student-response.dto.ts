import { StudentStatus } from '@prisma/client';
import { Expose } from 'class-transformer';

export class StudentResponseDto {
  @Expose()
  id: string;

  @Expose()
  tenantId: string;

  @Expose()
  studentId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  status: StudentStatus;

  @Expose()
  createdAt: Date;

  constructor(partial: Partial<StudentResponseDto>) {
    Object.assign(this, partial);
  }
}
