import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';

export class CreateProgramDto {
  @IsUUID()
  departmentId: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  degreeLevel?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationMonths?: number;
}
