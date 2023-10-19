import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { orderBuilder } from '@test/spec/order/order.e2e-builder';
import { givenExistingOrder } from '@test/spec/order/order.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('GET ALL ORDERS BEFORE DATE', () => {
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

  it('should return orders if there is orders before the demanded date in DB', async () => {
    
    // créer une permanence en base de données avec was missed à true
    const order = orderBuilder().build();
    const orderInDb = await givenExistingOrder(connection, order);
    // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
    // récupèrer la réponse HTTP

    const getAllOrdersBeforDateResponse = await request(app.getHttpServer()).get(`/api/orders/get-all-orders-before-date/2030-10-22T10:00:00.000Z`);
    
    
    // vérifier que la réponse a bien un status 200
    expect(getAllOrdersBeforDateResponse.status).toBe(200);
    
    // vérifier que la réponse a bien un body avec un tableau vide
    // même chose que :
    expect(getAllOrdersBeforDateResponse.body.length).toBe(1);
  });

  it('should not return any order if there is no order before the demanded date in DB', async () => {
    
    // créer une permanence en base de données avec was missed à true
    const order = orderBuilder().build();
    const orderInDb = await givenExistingOrder(connection, order);
    // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
    // récupèrer la réponse HTTP

    const getAllOrdersBeforDateResponse = await request(app.getHttpServer()).get(`/api/orders/get-all-orders-before-date/2022-10-22T10:00:00.000Z`);


    // vérifier que la réponse a bien un status 200
    expect(getAllOrdersBeforDateResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getAllOrdersBeforDateResponse.body).toEqual([]);
    // même chose que :
    expect(getAllOrdersBeforDateResponse.body.length).toBe(0);
  });
  
  // s'execute après tous les tests de ce fichier
  // permet de supprimer les données de la DB et de fermer la connection
  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
