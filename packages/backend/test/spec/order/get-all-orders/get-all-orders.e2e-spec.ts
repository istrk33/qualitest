import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
// import { mentoringSlotBuilder } from '@test/spec/mentoring-slot/mentoring-slot.e2e-builder';
// import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { givenExistingMentoringSlot } from '@test/spec/mentoring-slot/mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get All Orders ', () => {
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

  it('should return a mentoring slot if there is a missed mentoring slot in DB', async () => {
    // ARRANGE :
    // créer une permanence en base de données avec was missed à true
    const mentoringSlot = mentoringSlotBuilder().withWasMissed(true).build();
    const mentoringSlotInDb = await givenExistingMentoringSlot(connection, mentoringSlot);

    // le design pattern Builder permet de construire une entité (ici une permanence)
    // en ne spécifiant que les champs qui nous intéressent
    // c'est équivallent à :
    // const mentoringSlot = new MentoringSlot();
    // mentoringSlot.startDate = '2023-10-22T10:00:00.000Z';
    // mentoringSlot.endDate = '2023-10-22T12:00:00.000Z';
    // mentoringSlot.wasMissed = true;
    // c'est surtout utile pour les entités qui ont beaucoup de champs

    // envoie une requête GET à l'app de test et récupère la réponse
    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/was-missed');

    // vérifier que la réponse a bien un status 200
    expect(getMissedMentoringSlotsResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec la permanence créée
    expect(getMissedMentoringSlotsResponse.body.length).toEqual(1);

    // vérifie que la permanence récupérée est bien celle créée en BDD
    expect(getMissedMentoringSlotsResponse.body[0].id).toEqual(mentoringSlotInDb.id);
    expect(getMissedMentoringSlotsResponse.body[0].startDate).toEqual(mentoringSlotInDb.startDate);
    expect(getMissedMentoringSlotsResponse.body[0].endDate).toEqual(mentoringSlotInDb.endDate);
  });

  // s'execute après tous les tests de ce fichier
  // permet de supprimer les données de la DB et de fermer la connection
  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
