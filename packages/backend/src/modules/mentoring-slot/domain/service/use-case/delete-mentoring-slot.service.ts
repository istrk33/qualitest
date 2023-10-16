import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class DeleteMentoringSlotService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) {}

  async deleteMentoringSlot(id: string): Promise<void> {
    const mentoringSlot = await this.mentoringSlotRepository.findMentoringSlotById(id);

    if (!mentoringSlot) {
      throw new Exception(ExceptionTypeEnum.NotFound, `MentoringSlot with id ${id} not found`);
    }

    await this.mentoringSlotRepository.delete({ id: id });
  }
}
