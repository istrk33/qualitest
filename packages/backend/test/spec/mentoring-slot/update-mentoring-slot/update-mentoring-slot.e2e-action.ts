import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import MentoringSlotOrm from '@src/modules/mentoring-slot/infrastructure/db/entity/mentoring-slot.orm-entity';
import { randomUUID } from 'crypto';
import { UpdateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/update-mentoring-slot.dto.interface';

export const whenUpdatingAMentoringSlot = async (
  app: NestExpressApplication,
  mentoringSlot: MentoringSlotOrm,
): Promise<{
  updateMentoringSlotResponse: request.Response;
  updateMentoringSlotRequestData: UpdateMentoringSlotDtoInterface;
}> => {
  const updateMentoringSlotRequestData: UpdateMentoringSlotDtoInterface = {
    startDate: '2023-11-22T10:00:00.000Z',
    endDate: '2023-11-22T12:00:00.000Z',
  };

  const updateMentoringSlotResponse = await request(app.getHttpServer())
    .patch('/api/mentoring-slots/' + mentoringSlot.id)
    .send(updateMentoringSlotRequestData);

  return {
    updateMentoringSlotResponse,
    updateMentoringSlotRequestData,
  };
};

export const whenUpdatingAInexistantMentoringSlot = async (
  app: NestExpressApplication,
  mentoringSlot: MentoringSlotOrm,
): Promise<{
  getInexistantMentoringSlotResponse: request.Response;
}> => {
  const updateMentoringSlotRequestData: UpdateMentoringSlotDtoInterface = {
    startDate: '2023-10-22T10:00:00.000Z',
    endDate: '2023-10-22T12:00:00.000Z',
  };

  const getInexistantMentoringSlotResponse = await request(app.getHttpServer())
    .patch('/api/mentoring-slots/' + randomUUID())
    .send(updateMentoringSlotRequestData);

  return {
    getInexistantMentoringSlotResponse,
  };
};
