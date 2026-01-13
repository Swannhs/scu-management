import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  create(tenantId: string, data: CreateRoomDto) {
    return this.prisma.room.create({
      data: {
        tenantId,
        name: data.name,
        code: data.code,
        capacity: data.capacity,
        building: data.building,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.room.findMany({
      where: { tenantId },
    });
  }
}
