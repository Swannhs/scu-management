import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class AddQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  questionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  marks: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sequenceOrder: number;
}
