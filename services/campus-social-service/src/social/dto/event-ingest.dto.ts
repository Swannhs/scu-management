import { IsObject, IsString, MaxLength } from 'class-validator';

export class EventIngestDto {
  @IsString()
  @MaxLength(200)
  eventType!: string;

  @IsObject()
  payload!: Record<string, unknown>;
}
