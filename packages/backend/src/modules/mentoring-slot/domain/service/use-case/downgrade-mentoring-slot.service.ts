import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { DowngradeMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/downgrade-mentoring-slot.dto.interface';

export class DowngradeMentoringSlotService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) {}

  async downgradeMentoringSlot(id: string, dowgradeMentoringSlotDto: DowngradeMentoringSlotDtoInterface): Promise<MentoringSlot> {
    const mentoringSlot = await this.mentoringSlotRepository.findMentoringSlotById(id);

    if (!mentoringSlot) {
      throw new Exception(ExceptionTypeEnum.NotFound, `MentoringSlot with id ${id} not found`);
    }

    mentoringSlot.setIsDowngraded(dowgradeMentoringSlotDto.isDowngraded);

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
