import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { UploadMediaDto } from '../dto/upload-media.dto';
import { MediaService } from '../services/media.service';

@Controller('v1/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  upload(@Body() dto: UploadMediaDto) {
    return this.mediaService.upload(dto);
  }
}
