import DataSource from '@src/modules/database/config/typeorm.config';
import { CreateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/create-mentoring-slot.dto.interface';
import MentoringSlotOrm from '@src/modules/mentoring-slot/infrastructure/db/entity/mentoring-slot.orm-entity';

export const givenExistingMentoringSlot = async (connection: typeof DataSource, mentoringSlotBuild: CreateMentoringSlotDtoInterface) => {
  const mentoringSlotRepository = connection.getRepository(MentoringSlotOrm);

  const mentoringSlot = mentoringSlotRepository.create(mentoringSlotBuild as DeepPartial<MentoringSlotOrm>);

  return mentoringSlotRepository.save(mentoringSlot);
};
