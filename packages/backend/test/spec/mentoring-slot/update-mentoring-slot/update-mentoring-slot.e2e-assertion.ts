import { UpdateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/update-mentoring-slot.dto.interface';
import MentoringSlotOrm from '@src/modules/mentoring-slot/infrastructure/db/entity/mentoring-slot.orm-entity';
import request from 'supertest';

export const thenTheResponseShouldContainTheUpdatedMentoringSlot = (
  updateMentoringSlotResponse: request.Response,
  updateMentoringSlotRequestData: UpdateMentoringSlotDtoInterface,
  mentoringSlot: MentoringSlotOrm,
) => {
  expect(updateMentoringSlotResponse.body.id).toEqual(mentoringSlot.id);

  expect(updateMentoringSlotResponse.body.startDate).toEqual(updateMentoringSlotRequestData.startDate);
  expect(updateMentoringSlotResponse.body.endDate).toEqual(updateMentoringSlotRequestData.endDate);
};
