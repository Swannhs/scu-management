import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @MaxLength(140)
  name?: string;

  @IsOptional()
  @IsUUID('4')
  avatarFileId?: string;
}
