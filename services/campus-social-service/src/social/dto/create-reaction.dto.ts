import { IsString, MaxLength } from 'class-validator';

export class CreateReactionDto {
  @IsString()
  @MaxLength(50)
  reactionType!: string;
}
