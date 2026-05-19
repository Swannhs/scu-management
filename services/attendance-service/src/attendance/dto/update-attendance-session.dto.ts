import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateAttendanceSessionDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsIn(['draft', 'open', 'closed', 'cancelled'])
  status?: string;
}
