import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDiaryMessageEntities1694425036186 implements MigrationInterface {
    name = 'CreateDiaryMessageEntities1694425036186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "diary_message_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_9979b73ba4700bb60d7fac18702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diaryMessage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "createdById" uuid NOT NULL, CONSTRAINT "PK_26b33196ccc8ac6875c3a8da745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "diary_message_translation" ADD CONSTRAINT "FK_38eb6a883fa6762ab5fab908074" FOREIGN KEY ("translatableId") REFERENCES "diaryMessage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diaryMessage" ADD CONSTRAINT "FK_20f2c27d23232edcbea0ed71cf5" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diaryMessage" DROP CONSTRAINT "FK_20f2c27d23232edcbea0ed71cf5"`);
        await queryRunner.query(`ALTER TABLE "diary_message_translation" DROP CONSTRAINT "FK_38eb6a883fa6762ab5fab908074"`);
        await queryRunner.query(`DROP TABLE "diaryMessage"`);
        await queryRunner.query(`DROP TABLE "diary_message_translation"`);
    }

}
