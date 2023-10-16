import { SearchMentoringSlotsDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/search-mentoring-slots.dto.interface';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';

export default class SearchMentoringSlotsService {
  constructor(private readonly pauseRepository: MentoringSlotRepositoryInterface) {}

  async searchMentoringSlots(searchFilters: SearchMentoringSlotsDtoInterface): Promise<MentoringSlot[]> {
    return await this.pauseRepository.searchMentoringSlots(searchFilters);
  }
}
