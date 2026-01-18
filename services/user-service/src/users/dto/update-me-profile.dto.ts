import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateMeProfileDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  avatarRef?: string;

  @IsOptional()
  @IsObject()
  emergencyContact?: Record<string, any>;
}
