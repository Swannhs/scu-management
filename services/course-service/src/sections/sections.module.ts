import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { SessionsController } from './sessions.controller';
import { FacultyWorkflowController } from './faculty-workflow.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SectionsService],
  controllers: [SectionsController, SessionsController, FacultyWorkflowController],
})
export class SectionsModule {}
