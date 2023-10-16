import { CreateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/create-mentoring-slot.dto.interface';
import { IsDateString } from 'class-validator';

export class CreateMentoringSlotDto implements CreateMentoringSlotDtoInterface {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
