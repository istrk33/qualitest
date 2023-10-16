import { UpdateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/update-mentoring-slot.dto.interface';
import { IsDateString } from 'class-validator';

export class UpdateMentoringSlotDto implements UpdateMentoringSlotDtoInterface {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
