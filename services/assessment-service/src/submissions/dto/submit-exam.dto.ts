import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, ValidateNested, IsUUID, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  questionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answerText: string;
}

export class SubmitExamDto {
  @ApiProperty({ type: [AnswerDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
