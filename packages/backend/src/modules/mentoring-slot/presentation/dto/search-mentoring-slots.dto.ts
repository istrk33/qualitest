import { SearchMentoringSlotsDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/search-mentoring-slots.dto.interface';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class SearchMentoringSlotsDto implements SearchMentoringSlotsDtoInterface {
  @IsOptional()
  @IsString()
  @IsDateString()
  date?: string;
}
