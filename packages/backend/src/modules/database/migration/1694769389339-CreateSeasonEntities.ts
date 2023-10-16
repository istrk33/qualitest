import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSeasonEntities1694769389339 implements MigrationInterface {
    name = 'CreateSeasonEntities1694769389339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "season_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_ea273155ace4415d9ba304ffe1e" UNIQUE ("title"), CONSTRAINT "PK_49bf677f41aa6f2d6d354a0965c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "season" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "image" character varying, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "season_translation" ADD CONSTRAINT "FK_8b0a3d8c0bc7eb8627e444c9e92" FOREIGN KEY ("translatableId") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "season_translation" DROP CONSTRAINT "FK_8b0a3d8c0bc7eb8627e444c9e92"`);
        await queryRunner.query(`DROP TABLE "season"`);
        await queryRunner.query(`DROP TABLE "season_translation"`);
    }

}
