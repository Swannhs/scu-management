import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MaxLength(2000)
  text!: string;

  @IsOptional()
  @IsUUID()
  parentCommentId?: string;
}
