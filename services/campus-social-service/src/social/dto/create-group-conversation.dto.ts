import { IsArray, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateGroupConversationDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  recipientIds!: string[];
}
