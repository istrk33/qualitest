import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { mentoringSlotBuilder } from '../mentoring-slot.e2e-builder';
import { givenExistingMentoringSlot } from '../mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Missed Mentoring Slots ', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return 404 error for inexistant slug in mentoring slots', async () => {
        const getSlotBySlug = await request(app.getHttpServer()).get('/api/mentoring-slots/by-slug/toto');
        expect(getSlotBySlug.status).toBe(404);
        // /api/mentoring-slots/by-slug/toto
    });


    it('should return existing mentoring', async () => {
        const mentoringSlot = mentoringSlotBuilder().build();
        const mentoringSlotInDb = await givenExistingMentoringSlot(connection, mentoringSlot);
        
        const mentoringSlotInDb2 = await request(app.getHttpServer()).get(`/api/mentoring-slots/by-slug/${mentoringSlotInDb.slug}`);
        expect(mentoringSlotInDb2.status).toBe(200);
        expect(mentoringSlotInDb2.body.slug).toEqual(mentoringSlotInDb.slug);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
});
