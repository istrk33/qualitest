import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentEntities1693834016748 implements MigrationInterface {
    name = 'CreateAppointmentEntities1693834016748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_4f4e97a84e2ed528520808afa92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "date" date NOT NULL, "oldDate" date, "slug" character varying NOT NULL, "place" character varying NOT NULL, "isCancelled" boolean, "createdById" uuid NOT NULL, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment_guest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hasConfirmedTheAppointment" boolean, "hasConfirmedTheAppointmentTookPlace" boolean, "hasMissedTheAppointement" boolean, "appointmentId" uuid, "userId" uuid NOT NULL, CONSTRAINT "PK_64b99c959632f676a238d13ebd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment_translation" ADD CONSTRAINT "FK_3e21fd50c9d1be374b3b620002c" FOREIGN KEY ("translatableId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_6fd8c4e7663d561d0679412e310" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" ADD CONSTRAINT "FK_0bad2851364dbc370bad0683c53" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" ADD CONSTRAINT "FK_922383c713952f61fefa054dee7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_guest" DROP CONSTRAINT "FK_922383c713952f61fefa054dee7"`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" DROP CONSTRAINT "FK_0bad2851364dbc370bad0683c53"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_6fd8c4e7663d561d0679412e310"`);
        await queryRunner.query(`ALTER TABLE "appointment_translation" DROP CONSTRAINT "FK_3e21fd50c9d1be374b3b620002c"`);
        await queryRunner.query(`DROP TABLE "appointment_guest"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "appointment_translation"`);
    }

}
