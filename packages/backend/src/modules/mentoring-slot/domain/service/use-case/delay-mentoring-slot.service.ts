import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';

export class DelayMentoringSlotService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) {}

  async delayMentoringSlot(id: string): Promise<MentoringSlot> {
    const mentoringSlot = await this.mentoringSlotRepository.findMentoringSlotById(id);

    if (!mentoringSlot) {
      throw new Exception(ExceptionTypeEnum.NotFound, `MentoringSlot with id ${id} not found`);
    }

    mentoringSlot.delay();

    return await this.saveMentoringSlot(mentoringSlot);
  }

  private async saveMentoringSlot(mentoringSlotToPersist: DeepPartial<MentoringSlot>): Promise<MentoringSlot> {
    try {
      const mentoringSlot = await this.mentoringSlotRepository.persist<MentoringSlot>(mentoringSlotToPersist);

      return mentoringSlot;
    } catch (error) {
      throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist mentoringSlot : ${error.message}`);
    }
  }
}
