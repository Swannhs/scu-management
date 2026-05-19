import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAttendanceMarkDto {
  @IsUUID()
  studentId: string;

  @IsString()
  @IsIn(['present', 'absent', 'late', 'excused'])
  status: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
