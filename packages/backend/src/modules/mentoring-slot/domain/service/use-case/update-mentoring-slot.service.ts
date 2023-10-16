import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { UpdateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/update-mentoring-slot.dto.interface';
import MentoringSlotCreationDuplicateVerifierService from '@src/modules/mentoring-slot/domain/service/utils/mentoring-slot-creation-duplicate-verifier/mentoring-slot-creation-duplicate-verifier.service';

export class UpdateMentoringSlotService {
  constructor(
    private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface,
    private readonly mentoringSlotCreationDuplicateVerifierService: MentoringSlotCreationDuplicateVerifierService,
  ) {}

  async updateMentoringSlot(id: string, updateMentoringSlotDto: UpdateMentoringSlotDtoInterface): Promise<MentoringSlot> {
    const mentoringSlot = await this.mentoringSlotRepository.findMentoringSlotById(id);

    if (!mentoringSlot) {
      throw new Exception(ExceptionTypeEnum.NotFound, `MentoringSlot with id ${id} not found`);
    }

    await this.mentoringSlotCreationDuplicateVerifierService.verifyDuplicates(updateMentoringSlotDto, mentoringSlot);

    const mentoringSlotToBePersisted = {
      ...mentoringSlot,
      ...updateMentoringSlotDto,
    };

    return await this.saveMentoringSlot(mentoringSlotToBePersisted);
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
