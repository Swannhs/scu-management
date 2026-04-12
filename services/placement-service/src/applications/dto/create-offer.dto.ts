import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateOfferDto {
  @IsOptional()
  @IsNumber()
  ctc?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsUrl()
  offerLetterUrl?: string;
}
