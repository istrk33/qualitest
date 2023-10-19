import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { mentoringSlotBuilder } from '@test/spec/mentoring-slot/mentoring-slot.e2e-builder';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { givenExistingMentoringSlot } from '@test/spec/mentoring-slot/mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Mentoring Slot by slug', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should return a mentoring slot by slug', async () => {
    const mentoringSlot = mentoringSlotBuilder().build();
    const mentoringSlotInDb = await givenExistingMentoringSlot(connection, mentoringSlot);

    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get(
      `/api/mentoring-slots/by-slug/${mentoringSlotInDb.slug}`,
    );

    expect(getMissedMentoringSlotsResponse.status).toBe(200);
    expect(getMissedMentoringSlotsResponse.body.id).toEqual(mentoringSlotInDb.id);
  });

  // test pour vérifier que si on passe le slug d'un mentoring slot qui n'existe pas, on a une erreur 404
  it('should return a 404 error if the mentoring slot does not exist', async () => {
    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get(`/api/mentoring-slots/by-slug/jean-pierre`);

    expect(getMissedMentoringSlotsResponse.status).toBe(404);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
