import { Module } from '@nestjs/common';
import { GradingService } from './grading.service';
import { GradingController } from './grading.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GradingService],
  controllers: [GradingController],
})
export class GradingModule {}
