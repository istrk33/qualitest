import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';

export class GetMentoringSlotsByMissedService {
  async getMentoringSlotsByMissed(isUserAuthenticated: boolean): Promise<MentoringSlot[]> {
    if (!isUserAuthenticated) {
      throw new Error('User is not authenticated');
    }

    const mentoringSlotRepository = new MentoringSlotRepository();

    const mentoringSlots = await mentoringSlotRepository.findMentoringSlotsByMissed();
    return mentoringSlots;
  }
}
