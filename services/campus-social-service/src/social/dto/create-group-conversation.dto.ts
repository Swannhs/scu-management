import { IsArray, IsUUID } from 'class-validator';

export class CreateGroupConversationDto {
  @IsArray()
  @IsUUID('4', { each: true })
  recipientIds!: string[];
}
