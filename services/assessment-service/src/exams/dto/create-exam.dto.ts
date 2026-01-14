import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateExamDto {
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
  courseOfferingId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  durationMinutes: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalMarks: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  passingMarks?: number;
}
