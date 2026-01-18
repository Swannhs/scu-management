import { Test, TestingModule } from '@nestjs/testing';
import { MeController } from './me.controller';
import { UsersService } from './users.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { ForbiddenException, BadRequestException } from '@nestjs/common';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

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
    it('should return user info with flattened IDs', async () => {
      const user: AuthenticatedUser = { sub: 'u1', realm_access: { roles: ['STUDENT'] }, tenant_id: 't1' };
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

      expect(result).toEqual({
        userId: 'u1',
        tenantId: 't1',
        roles: ['STUDENT'],
        studentId: 's1',
        facultyId: null,
        parentId: null,
      });
    });
  });

  describe('getProfile', () => {
    it('should return profile info', async () => {
      const user: AuthenticatedUser = { sub: 'u1', email: 'token@email.com', given_name: 'Token', family_name: 'Name', tenant_id: 't1' };
      const localUser = {
          id: '1',
          email: 'db@email.com',
          firstName: 'DB',
          lastName: 'Name',
          phone: '123',
          address: '123 St',
          avatarUrl: 'http://avatar',
          emergencyContact: { name: 'Mom' }
      } as any;
      (usersService.findByKeycloakId as jest.Mock).mockResolvedValue(localUser);

      const result = await controller.getProfile({ headers: { 'x-tenant-id': 't1' } } as any, user);

      expect(result).toEqual({
        firstName: 'DB',
        lastName: 'Name',
        email: 'db@email.com',
        phone: '123',
        address: '123 St',
        avatarUrl: 'http://avatar',
        emergencyContact: { name: 'Mom' }
      });
    });

    it('should fall back to token info if local user has missing fields', async () => {
      const user: AuthenticatedUser = { sub: 'u1', email: 'token@email.com', given_name: 'Token', family_name: 'Name', tenant_id: 't1' };
      const localUser = {
          id: '1',
          // Missing fields
      } as any;
      (usersService.findByKeycloakId as jest.Mock).mockResolvedValue(localUser);

      const result = await controller.getProfile({ headers: { 'x-tenant-id': 't1' } } as any, user);

      expect(result).toEqual({
        firstName: 'Token',
        lastName: 'Name',
        email: 'token@email.com',
        phone: undefined,
        address: undefined,
        avatarUrl: undefined,
        emergencyContact: undefined
      });
    });
  });

  describe('updateProfile', () => {
    it('should call service with data', async () => {
      const user: AuthenticatedUser = { sub: 'u1', tenant_id: 't1' };
      const data = { phone: '555', address: 'New Addr' };

      (usersService.updateProfile as jest.Mock).mockResolvedValue({ ...data, id: '1' });

      const result = await controller.updateProfile({ headers: { 'x-tenant-id': 't1' } } as any, user, data);

      expect(usersService.updateProfile).toHaveBeenCalledWith('u1', 't1', data);
      expect(result).toEqual({ phone: '555', address: 'New Addr', id: '1' });
    });
  });

  describe('getSchedule', () => {
      it('should fetch schedule for student', async () => {
          const user: AuthenticatedUser = { sub: 'u1', realm_access: { roles: ['STUDENT'] }, tenant_id: 't1' };
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
