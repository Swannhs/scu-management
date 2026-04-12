import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesController } from './companies/companies.controller';
import { JobPostsController } from './job-posts/job-posts.controller';
import { ApplicationsController } from './applications/applications.controller';
import { OffersController } from './offers/offers.controller';
import { CompaniesService } from './companies/companies.service';
import { JobPostsService } from './job-posts/job-posts.service';
import { ApplicationsService } from './applications/applications.service';
import { OffersService } from './offers/offers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KeycloakConnectModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        authServerUrl: config.get<string>('KEYCLOAK_AUTH_SERVER_URL')!,
        realm: config.get<string>('KEYCLOAK_REALM')!,
        clientId: config.get<string>('KEYCLOAK_CLIENT_ID')!,
        secret: config.get<string>('KEYCLOAK_CLIENT_SECRET')!,
        cookieKey: 'KEYCLOAK_JWT',
        logLevels: ['verbose'],
        useNestLogger: true,
      }),
    }),
    PrismaModule,
  ],
  controllers: [
    CompaniesController,
    JobPostsController,
    ApplicationsController,
    OffersController
  ],
  providers: [
    CompaniesService,
    JobPostsService,
    ApplicationsService,
    OffersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule { }
