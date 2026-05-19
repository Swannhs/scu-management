import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export enum AssessmentTypeDto {
  ASSIGNMENT = 'assignment',
  QUIZ = 'quiz',
  EXAM = 'exam',
  PROJECT = 'project',
  LAB = 'lab',
  PRESENTATION = 'presentation',
}

export class CreateAssessmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sectionId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ enum: AssessmentTypeDto })
  @IsEnum(AssessmentTypeDto)
  type: AssessmentTypeDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  examDate?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalMarks: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  weight?: number;
}
