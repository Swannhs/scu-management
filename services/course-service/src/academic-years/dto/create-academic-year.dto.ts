import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAcademicYearDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
