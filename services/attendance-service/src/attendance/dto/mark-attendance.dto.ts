import { IsArray, IsIn, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AttendanceMarkItemDto {
  @IsUUID()
  studentId: string;

  @IsString()
  @IsIn(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'])
  status: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}

export class MarkAttendanceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceMarkItemDto)
  records: AttendanceMarkItemDto[];
}
