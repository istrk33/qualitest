import { SearchMentoringSlotsDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/search-mentoring-slots.dto.interface';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';

export interface MentoringSlotRepositoryInterface extends RepositoryInterface {
  searchMentoringSlots(searchFilters: SearchMentoringSlotsDtoInterface): Promise<MentoringSlot[]>;
  findMentoringSlots(): Promise<MentoringSlot[]>;
  findMentoringSlotBySlug(slug: string): Promise<MentoringSlot>;
  findMentoringSlotById(id: string): Promise<MentoringSlot>;
  findMentoringSlotsBetweenDates(startDate: Date, endDate: Date): Promise<MentoringSlot[]>;
}
