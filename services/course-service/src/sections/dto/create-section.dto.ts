import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateSectionDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  termId: string;

  @IsOptional()
  @IsString()
  sectionName?: string;

  @IsOptional()
  @IsString()
  facultyId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;
}
