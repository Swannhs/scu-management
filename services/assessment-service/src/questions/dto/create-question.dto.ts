import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum QuestionType {
  MCQ = 'MCQ',
  ESSAY = 'ESSAY',
  TRUE_FALSE = 'TRUE_FALSE',
}

export enum DifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ enum: QuestionType })
  @IsNotEmpty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ required: false })
  @IsOptional()
  options?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  correctAnswer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ enum: DifficultyLevel })
  @IsNotEmpty()
  @IsEnum(DifficultyLevel)
  difficulty: DifficultyLevel;
}
