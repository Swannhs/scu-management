import { IsEnum, IsString } from 'class-validator';

export enum CallRoomType {
  DM = 'DM',
  GROUP = 'GROUP',
}

export class CreateCallRoomDto {
  @IsEnum(CallRoomType)
  type!: CallRoomType;

  @IsString()
  targetId!: string;
}
