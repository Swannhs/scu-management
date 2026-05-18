import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto, ListUsersDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse as ApiResponseType } from '@university/shared';

@ApiTags('Users')
@Controller(['v1/users', 'users'])
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users' })
  async findAll(
    @Headers('x-tenant-id') tenantId: string,
    @Query() query: ListUsersDto,
  ) {
    const result = await this.usersService.findAll(
      tenantId,
      query.page,
      query.limit,
    );
    return ApiResponseType.success(result.data, result.meta);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  async create(
    @Headers('x-tenant-id') tenantId: string,
    @Headers('x-user-role') userRole: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    const normalizedRole = (userRole || '').toUpperCase();
    if (!['SUPER_ADMIN', 'ADMIN'].includes(normalizedRole)) {
      throw new ForbiddenException('Insufficient role to create users');
    }

    const user = await this.usersService.create(tenantId, createUserDto);
    return ApiResponseType.success(user);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getMe(
    @Headers('x-user-id') userId: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    const user = await this.usersService.getMe(userId, tenantId);
    return ApiResponseType.success(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findOne(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    const user = await this.usersService.findOne(id, tenantId);
    return ApiResponseType.success(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, tenantId, updateUserDto);
    return ApiResponseType.success(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate user' })
  async remove(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    const user = await this.usersService.remove(id, tenantId);
    return ApiResponseType.success(user);
  }
}
