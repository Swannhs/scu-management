import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ForbiddenException, BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findByKeycloakId: jest.fn(),
    createUser: jest.fn(),
    findByTenant: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkTenantContext', () => {
    it('should throw ForbiddenException if header and token tenant mismatch', async () => {
      const req = { headers: { 'x-tenant-id': 'tenant-A' } } as any;
      const user = { tenant_id: 'tenant-B' };

      await expect(controller.getMe(req, user)).rejects.toThrow(ForbiddenException);
    });

    it('should use token tenant if header is missing', async () => {
      const req = { headers: {} } as any;
      const user = { tenant_id: 'tenant-A', sub: 'user-1' };
      mockUsersService.findByKeycloakId.mockResolvedValue({});

      await controller.getMe(req, user);
      expect(mockUsersService.findByKeycloakId).toHaveBeenCalledWith('user-1', 'tenant-A');
    });

    it('should use header tenant if token tenant is missing (e.g. service account)', async () => {
        // This scenario assumes token has no tenant_id but header is provided.
        // The code: effectiveTenant = tokenTenant || headerTenant
        // However, if logic step 4 checks !effectiveTenant -> BadRequest.
        // And if tokenTenant is undefined, check 4 passes with headerTenant.
        // And check "tokenTenant !== requestedTenant" (undefined !== undefined) is fine.

        const req = { headers: { 'x-tenant-id': 'tenant-A' } } as any;
        const user = { sub: 'service-account' }; // no tenant_id
        mockUsersService.findByKeycloakId.mockResolvedValue({});

        await controller.getMe(req, user);
        expect(mockUsersService.findByKeycloakId).toHaveBeenCalledWith('service-account', 'tenant-A');
      });

    it('should throw ForbiddenException if user tries to act on another tenant', async () => {
        // Scenario: User A (tenant-A) calls findAll with ?tenantId=tenant-B
        const req = { headers: {} } as any;
        const user = { tenant_id: 'tenant-A' };

        // Calling findAll
        await expect(controller.findAll(req, user, 'tenant-B')).rejects.toThrow(ForbiddenException);
    });

    it('should allow Global Admin to switch tenants', async () => {
        const req = { headers: { 'x-tenant-id': 'tenant-B' } } as any;
        const user = {
            realm_access: { roles: ['admin'] },
            // Global admin might not have tenant_id in token, or it might be ignored
            sub: 'admin'
        };

        mockUsersService.findByTenant.mockResolvedValue([]);

        await controller.findAll(req, user, 'tenant-B');
        expect(mockUsersService.findByTenant).toHaveBeenCalledWith('tenant-B');
    });

    it('should throw BadRequest if Global Admin does not provide tenantId', async () => {
        const req = { headers: {} } as any;
        const user = {
            realm_access: { roles: ['admin'] },
            sub: 'admin'
        };

        await expect(controller.findAll(req, user)).rejects.toThrow(BadRequestException);
    });
  });
});
