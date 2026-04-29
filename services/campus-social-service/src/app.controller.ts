import { Controller, Get } from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @Unprotected()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @Unprotected()
  health() {
    return { status: 'ok' };
  }

  @Get('ready')
  @Unprotected()
  async ready() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { status: 'ok' };
  }
}
