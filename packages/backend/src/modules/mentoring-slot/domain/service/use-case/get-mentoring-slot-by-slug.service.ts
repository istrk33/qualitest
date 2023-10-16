import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export default class GetMentoringSlotBySlugService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) {}

  async getMentoringSlotBySlug(slug: string): Promise<MentoringSlot> {
    const mentoringSlot = await this.mentoringSlotRepository.findMentoringSlotBySlug(slug);
    if (!mentoringSlot) {
      throw new Exception(ExceptionTypeEnum.NotFound, `MentoringSlot with slug ${slug} not found`);
    }

    return mentoringSlot;
  }
}
