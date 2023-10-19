import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';

describe('Get Missed Mentoring Slots ', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  // beforeAll est fonction mise à dispo par Vitest (framework de test)
  // qui sera executée avant tous les tests
  // permet de créer l'application et la connection à la base de données
  // et les stocker dans des variables globales (dispos pour tous les tests de ce fichier)
  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should not return any missed mentoring slots if there is no missed mentoring slots in DB', async () => {
    // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
    // récupèrer la réponse HTTP

    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/was-missed');

    // vérifier que la réponse a bien un status 200
    expect(getMissedMentoringSlotsResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getMissedMentoringSlotsResponse.body).toEqual([]);
    // même chose que :
    expect(getMissedMentoringSlotsResponse.body.length).toBe(0);
  });
});