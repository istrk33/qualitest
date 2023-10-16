import { CreateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/create-mentoring-slot.dto.interface';
import { UpdateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/update-mentoring-slot.dto.interface';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';

export default class MentoringSlotCreationDuplicateVerifierService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) {}

  async verifyDuplicates(
    createMentoringSlotDto: CreateMentoringSlotDtoInterface | UpdateMentoringSlotDtoInterface,
    mentoringSlotToIgnore: MentoringSlot = null,
  ) {
    await this.checkIfThereIsNoMentoringSlotForTheRequestDates(createMentoringSlotDto, mentoringSlotToIgnore);
  }

  private async checkIfThereIsNoMentoringSlotForTheRequestDates(
    createMentoringSlotDto: CreateMentoringSlotDtoInterface | UpdateMentoringSlotDtoInterface,
    mentoringSlotToIgnore: MentoringSlot = null,
  ) {
    const mentoringSlotsBetweenDates = await this.mentoringSlotRepository.findMentoringSlotsBetweenDates(
      new Date(createMentoringSlotDto.startDate),
      new Date(createMentoringSlotDto.endDate),
    );

    this.removeMentoringSlotToIgnoreFromList(mentoringSlotToIgnore, mentoringSlotsBetweenDates);

    if (mentoringSlotsBetweenDates.length > 0) {
      throw new Exception(ExceptionTypeEnum.BadRequest, 'The mentor has already a mentoring for this Dates');
    }
  }

  private removeMentoringSlotToIgnoreFromList(mentoringSlotToIgnore: MentoringSlot, mentoringSlotsByMentorBetweenDates: MentoringSlot[]) {
    if (mentoringSlotToIgnore) {
      const mentoringSlotToIgnoreIndex = mentoringSlotsByMentorBetweenDates.findIndex(
        (mentoringSlot) => mentoringSlot.id === mentoringSlotToIgnore.id,
      );

      if (mentoringSlotToIgnoreIndex !== -1) {
        mentoringSlotsByMentorBetweenDates.splice(mentoringSlotToIgnoreIndex, 1);
      }
    }
  }
}
