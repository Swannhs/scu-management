import { IsOptional, IsString, IsUrl } from 'class-validator';

export class ApplyJobDto {
  @IsOptional()
  @IsUrl()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}
