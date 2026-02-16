import { IsString, MaxLength } from 'class-validator';

export class CloseReportDto {
  @IsString()
  @MaxLength(500)
  actionTaken!: string;
}
