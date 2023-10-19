import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { orderBuilder } from '@test/spec/order/order.e2e-builder';
import { givenExistingOrder } from '@test/spec/order/order.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('GET ALL ORDERS', () => {
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

  it('should not return any order if there is no order in DB', async () => {
    // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
    // récupèrer la réponse HTTP

    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/get-all-orders');
    // vérifier que la réponse a bien un status 200
    expect(getAllOrdersResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getAllOrdersResponse.body).toEqual([]);
    // même chose que :
    expect(getAllOrdersResponse.body.length).toBe(0);
  });

  it('should return an order if there is an order in DB', async () => {
    // ARRANGE :
    // créer une permanence en base de données avec was missed à true
    const order = orderBuilder().build();
    const orderInDb = await givenExistingOrder(connection, order);

    // envoie une requête GET à l'app de test et récupère la réponse
    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/get-all-orders');
   
    // vérifier que la réponse a bien un status 200
    expect(getAllOrdersResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec la permanence créée
    expect(getAllOrdersResponse.body.length).toEqual(1);

    // vérifie que la permanence récupérée est bien celle créée en BDD
    expect(getAllOrdersResponse.body[0].id).toEqual(orderInDb.id);
    expect(getAllOrdersResponse.body[0].customer).toEqual(orderInDb.customer);
    expect(getAllOrdersResponse.body[0].startDate).toEqual(orderInDb.startDate);
    expect(getAllOrdersResponse.body[0].endDate).toEqual(orderInDb.endDate);
  });

  // s'execute après tous les tests de ce fichier
  // permet de supprimer les données de la DB et de fermer la connection
  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
