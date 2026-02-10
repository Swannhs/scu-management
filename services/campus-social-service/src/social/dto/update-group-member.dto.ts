import { GroupMemberRole } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateGroupMemberDto {
  @IsOptional()
  @IsEnum(GroupMemberRole)
  role?: GroupMemberRole;
}
