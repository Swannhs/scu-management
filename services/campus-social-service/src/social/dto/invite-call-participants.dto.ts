import { IsArray, IsUUID } from 'class-validator';

export class InviteCallParticipantsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  userIds!: string[];
}
