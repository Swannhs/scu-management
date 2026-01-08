import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MaxLength(4000)
  text!: string;

  @IsOptional()
  @IsUUID()
  fileId?: string;
}
