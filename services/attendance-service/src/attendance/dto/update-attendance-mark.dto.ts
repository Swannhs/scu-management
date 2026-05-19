import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateAttendanceMarkDto {
  @IsOptional()
  @IsString()
  @IsIn(['present', 'absent', 'late', 'excused'])
  status?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
