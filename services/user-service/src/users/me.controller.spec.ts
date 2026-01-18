import { Test, TestingModule } from '@nestjs/testing';
import { MeController } from './me.controller';
import { UsersService } from './users.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { ForbiddenException, BadRequestException } from '@nestjs/common';

describe('MeController', () => {
  let controller: MeController;
  let usersService: Partial<UsersService>;
  let httpService: Partial<HttpService>;

  beforeEach(async () => {
    usersService = {
      findByKeycloakId: jest.fn(),
      updateProfile: jest.fn(),
    };
    httpService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeController],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: HttpService, useValue: httpService },
      ],
    }).compile();

    controller = module.get<MeController>(MeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('should return user info with linked IDs', async () => {
      const user = { sub: 'u1', realm_access: { roles: ['STUDENT'] }, tenant_id: 't1' };
      const localUser = {
          id: '1',
          studentId: 's1',
          facultyId: null,
          parentId: null,
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '123'
      } as any;
      (usersService.findByKeycloakId as jest.Mock).mockResolvedValue(localUser);

      const result = await controller.getMe({ headers: { 'x-tenant-id': 't1' } } as any, user);

      expect(result).toMatchObject({
        userId: 'u1',
        tenantId: 't1',
        linked: { studentId: 's1' },
        email: 'test@example.com'
      });
    });
  });

  describe('getSchedule', () => {
      it('should fetch schedule for student', async () => {
          const user = { sub: 'u1', realm_access: { roles: ['STUDENT'] }, tenant_id: 't1' };
          const localUser = { studentId: 's1' } as any;
          (usersService.findByKeycloakId as jest.Mock).mockResolvedValue(localUser);

          const enrollments = [{ offering_id: 'sec1' }];
          const sessions = [{ id: 'sess1' }];

          (httpService.get as jest.Mock)
            .mockReturnValueOnce(of({ data: enrollments }))
            .mockReturnValueOnce(of({ data: sessions }));

          const result = await controller.getSchedule({ headers: { 'x-tenant-id': 't1' } } as any, user);
          expect(result).toEqual(sessions);
          expect(httpService.get).toHaveBeenCalledTimes(2);
      });
  });
});
