import { MigrationInterface, QueryRunner } from "typeorm";

export class PauseEntity1695041621737 implements MigrationInterface {
    name = 'PauseEntity1695041621737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pause_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "details" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_fba8c5ee55afbec5b75a61a1f93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pause" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "reason" character varying NOT NULL, "file" character varying, "userId" uuid, CONSTRAINT "PK_8c7646cf2a3ddcda68d50ca8d5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pause_translation" ADD CONSTRAINT "FK_4d88c90c450818a1b0b273fb8d1" FOREIGN KEY ("translatableId") REFERENCES "pause"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pause" ADD CONSTRAINT "FK_8f0401334df32a52fbbdeac2ad8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pause" DROP CONSTRAINT "FK_8f0401334df32a52fbbdeac2ad8"`);
        await queryRunner.query(`ALTER TABLE "pause_translation" DROP CONSTRAINT "FK_4d88c90c450818a1b0b273fb8d1"`);
        await queryRunner.query(`DROP TABLE "pause"`);
        await queryRunner.query(`DROP TABLE "pause_translation"`);
    }

}
