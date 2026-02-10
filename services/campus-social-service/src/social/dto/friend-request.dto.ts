import { IsOptional, IsUUID, ValidateIf } from 'class-validator';

export class FriendRequestDto {
  @ValidateIf((o) => !o.toUserId)
  @IsUUID()
  addresseeId?: string;

  @ValidateIf((o) => !o.addresseeId)
  @IsOptional()
  @IsUUID()
  toUserId?: string;

  get targetUserId(): string {
    return this.toUserId ?? this.addresseeId!;
  }
}
