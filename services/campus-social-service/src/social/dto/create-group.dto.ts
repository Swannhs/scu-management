import { GroupType, GroupVisibility } from '@prisma/client';
import { IsEnum, IsString, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @IsEnum(GroupType)
  type!: GroupType;

  @IsString()
  @MaxLength(140)
  name!: string;

  @IsEnum(GroupVisibility)
  visibility!: GroupVisibility;
}
