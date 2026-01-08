import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentsController],
})
export class StudentsModule {}
