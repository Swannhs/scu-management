import { IsDateString, IsIn, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateAssessmentDto {
  @IsUUID()
  sectionId: string;

  @IsString()
  name: string;

  @IsString()
  @IsIn(['MIDTERM', 'FINAL', 'QUIZ', 'SUPPLEMENTARY'])
  type: string;

  @IsDateString()
  date: string;

  @IsNumber()
  @Min(0)
  maxScore: number;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsOptional()
  @IsNumber()
  durationMinutes?: number;
}
