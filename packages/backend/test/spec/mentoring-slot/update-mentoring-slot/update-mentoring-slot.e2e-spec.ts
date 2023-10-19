import { NestExpressApplication } from '@nestjs/platform-express';
import MentoringSlotOrm from '@src/modules/mentoring-slot/infrastructure/db/entity/mentoring-slot.orm-entity';
import { mentoringSlotBuilder } from '@test/spec/mentoring-slot/mentoring-slot.e2e-builder';
import { givenExistingMentoringSlot } from '@test/spec/mentoring-slot/mentoring-slot.e2e-fixture';
import {
  whenUpdatingAInexistantMentoringSlot,
  whenUpdatingAMentoringSlot,
} from '@test/spec/mentoring-slot/update-mentoring-slot/update-mentoring-slot.e2e-action';

import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { thenTheResponseShouldContainTheUpdatedMentoringSlot } from '@test/spec/mentoring-slot/update-mentoring-slot/update-mentoring-slot.e2e-assertion';
import {
  thenTheResponseShouldBeBadRequest,
  thenTheResponseShouldBeNotFound,
  thenTheUpdateResponseShouldBeSuccessful,
} from '@test/spec/shared/response-status/assertion/response-status.e2e-assertion';

describe('Update MentoringSlot Category (e2e)', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;
  let mentoringSlot: MentoringSlotOrm;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();

    const mentoringSlotBuild = mentoringSlotBuilder()
      .withStartDate('2023-11-22T09:00:00.000Z')
      .withEndDate('2023-11-22T11:00:00.000Z')

      .build();

    mentoringSlot = await givenExistingMentoringSlot(connection, mentoringSlotBuild);
  });

  it('should update mentoringSlot', async () => {
    const { updateMentoringSlotResponse, updateMentoringSlotRequestData } = await whenUpdatingAMentoringSlot(app, mentoringSlot);

    thenTheUpdateResponseShouldBeSuccessful(updateMentoringSlotResponse);
    thenTheResponseShouldContainTheUpdatedMentoringSlot(updateMentoringSlotResponse, updateMentoringSlotRequestData, mentoringSlot);
  });

  it('should return 404 if mentoringSlot does not exist', async () => {
    const { getInexistantMentoringSlotResponse } = await whenUpdatingAInexistantMentoringSlot(app, mentoringSlot);

    thenTheResponseShouldBeNotFound(getInexistantMentoringSlotResponse);
  });

  it('should return an exception if there is already a mentoring slot ending between the start date and the end date of the new mentoring slot', async () => {
    const mentoringSlotWithDuplicateMentorSlotBuild = mentoringSlotBuilder()
      .withStartDate('2023-11-22T10:00:00.000Z')
      .withEndDate('2023-11-22T12:00:00.000Z')
      .build();

    await givenExistingMentoringSlot(connection, mentoringSlotWithDuplicateMentorSlotBuild);

    const { updateMentoringSlotResponse } = await whenUpdatingAMentoringSlot(app, mentoringSlot);

    thenTheResponseShouldBeBadRequest(updateMentoringSlotResponse);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
