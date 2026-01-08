import { ProfilePrivacy } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(160)
  headline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;

  @IsOptional()
  @IsUUID()
  avatarFileId?: string;

  @IsOptional()
  @IsUUID()
  coverFileId?: string;

  @IsOptional()
  @IsEnum(ProfilePrivacy)
  privacy?: ProfilePrivacy;
}
