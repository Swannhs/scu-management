import { IsUUID } from 'class-validator';

export class InviteUserDto {
  @IsUUID('4')
  userId!: string;
}
