import { PostTargetType } from '@prisma/client';
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsEnum(PostTargetType)
  targetType!: PostTargetType;

  @IsUUID()
  targetId!: string;

  @IsString()
  @MaxLength(5000)
  text!: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUUID('4', { each: true })
  mediaFileIds?: string[];
}
