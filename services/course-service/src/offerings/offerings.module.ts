import { Module } from '@nestjs/common';
import { CourseDataService } from './course-data.service';
import { OfferingsController } from './offerings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [CourseDataService],
    controllers: [OfferingsController],
})
export class OfferingsModule { }
