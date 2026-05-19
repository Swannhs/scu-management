import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateAttendanceMarkDto } from './create-attendance-mark.dto';

export class BulkAttendanceMarksDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttendanceMarkDto)
  marks: CreateAttendanceMarkDto[];
}
