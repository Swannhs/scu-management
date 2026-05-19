import { IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateSectionDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  termId: string;

  @IsOptional()
  @IsString()
  sectionCode?: string;

  @IsOptional()
  @IsString()
  sectionName?: string;

  @IsOptional()
  @IsString()
  facultyId?: string;

  @IsOptional()
  @IsUUID()
  roomId?: string;

  @IsOptional()
  @IsString()
  schedule?: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;
}
