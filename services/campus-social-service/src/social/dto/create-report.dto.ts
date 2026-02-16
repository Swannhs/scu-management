import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export enum ReportType {
  POST = 'POST',
  COMMENT = 'COMMENT',
  USER = 'USER',
}

export class CreateReportDto {
  @IsEnum(ReportType)
  type!: ReportType;

  @IsString()
  targetId!: string;

  @IsString()
  @MaxLength(200)
  reason!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  details?: string;
}
