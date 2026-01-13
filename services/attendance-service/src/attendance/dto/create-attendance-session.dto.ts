import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAttendanceSessionDto {
  @IsUUID()
  sectionId: string;

  @IsOptional()
  @IsUUID()
  termId?: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;
}
