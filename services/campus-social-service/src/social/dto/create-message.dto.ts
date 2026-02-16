import { IsArray, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MessageAttachmentDto {
  @IsString()
  url!: string;

  @IsString()
  type!: string;
}

export class CreateMessageDto {
  @IsString()
  @MaxLength(4000)
  text!: string;

  @IsOptional()
  @IsUUID()
  fileId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageAttachmentDto)
  attachments?: MessageAttachmentDto[];
}
