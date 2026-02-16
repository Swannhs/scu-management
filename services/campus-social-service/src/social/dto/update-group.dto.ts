import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @MaxLength(140)
  name?: string;
}
