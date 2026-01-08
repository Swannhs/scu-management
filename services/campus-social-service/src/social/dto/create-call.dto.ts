import { CallType } from '@prisma/client';
import { IsEnum, IsString, MaxLength } from 'class-validator';

export class CreateCallDto {
  @IsEnum(CallType)
  callType!: CallType;

  @IsString()
  @MaxLength(255)
  providerRoomId!: string;
}
