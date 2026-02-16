import { IsString, MaxLength } from 'class-validator';

export class UploadMediaDto {
  @IsString()
  @MaxLength(255)
  fileName!: string;

  @IsString()
  @MaxLength(100)
  mimeType!: string;

  @IsString()
  contentBase64!: string;
}
