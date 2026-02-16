import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ReadConversationDto {
  @IsOptional()
  @IsUUID('4')
  lastReadMessageId?: string;

  @IsOptional()
  @IsString()
  lastReadAt?: string;
}
