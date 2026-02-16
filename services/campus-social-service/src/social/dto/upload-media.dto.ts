import { IsBase64, IsIn, IsString, MaxLength } from 'class-validator';
import { IsString, MaxLength } from 'class-validator';

export class UploadMediaDto {
  @IsString()
  @MaxLength(255)
  fileName!: string;

  @IsString()
  @IsIn(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
  mimeType!: string;

  @IsString()
  @IsBase64()
  @MaxLength(10_000_000)
  @MaxLength(100)
  mimeType!: string;

  @IsString()
  contentBase64!: string;
}
