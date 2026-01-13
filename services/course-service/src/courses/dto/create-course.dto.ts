import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateCourseDto {
  @IsOptional()
  @IsUUID()
  programId?: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
