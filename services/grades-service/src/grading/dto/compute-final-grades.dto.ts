import { IsOptional, IsUUID } from 'class-validator';

export class ComputeFinalGradesDto {
  @IsOptional()
  @IsUUID()
  termId?: string;
}
