import { DowngradeMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/downgrade-mentoring-slot.dto.interface';
import { IsBoolean } from 'class-validator';

export class DowngradeMentoringSlotDto implements DowngradeMentoringSlotDtoInterface {
  @IsBoolean()
  isDowngraded: boolean;
}
