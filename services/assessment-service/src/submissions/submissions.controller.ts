import { Controller, Post, Body, Param } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { Tenant } from '../common/tenant.decorator';
import { TenantContext } from '../common/tenant-context';
import { Roles } from 'nest-keycloak-connect';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('submissions')
@ApiBearerAuth()
@Controller('exams/:examId/submit')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @Roles({ roles: ['STUDENT'] })
  submit(@Param('examId') examId: string, @Body() submitExamDto: SubmitExamDto, @Tenant() tenant: TenantContext) {
    return this.submissionsService.submit(examId, submitExamDto, tenant);
  }
}
