import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GradeSubmissionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  marksAwarded: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  feedback?: string;
}
