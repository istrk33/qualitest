import { MigrationInterface, QueryRunner } from "typeorm";

export class MissionAttachments1686216268232 implements MigrationInterface {
    name = 'MissionAttachments1686216268232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mission_lesson_attachment_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_02e88edff30cb8669248c1bb1ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission_lesson_attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "missionId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_2023def8495b56f1705da73aa53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission_exercise_attachment_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_b2e15cbfe4a53b2c18a123cb24b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission_exercise_attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "missionId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_3e865a15fbecdbd03988e6aac74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission_annex_attachment_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_f415299251d4051ab0cd18e171c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission_annex_attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "missionId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_d7fce95daeb7099748c66bebfdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mission_lesson_attachment_translation" ADD CONSTRAINT "FK_c5d1f4e91cd1cb98320fb139573" FOREIGN KEY ("translatableId") REFERENCES "mission_lesson_attachment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_lesson_attachment" ADD CONSTRAINT "FK_ca05494b220758c5e2a2d46c7d5" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_lesson_attachment" ADD CONSTRAINT "FK_5756e1216cefbc4e2fc0477ae38" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_lesson_attachment" ADD CONSTRAINT "FK_b29af43379cc7c0388376c0042f" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_exercise_attachment_translation" ADD CONSTRAINT "FK_b2d6ef9b2d39a7a78ecce1ed130" FOREIGN KEY ("translatableId") REFERENCES "mission_exercise_attachment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_exercise_attachment" ADD CONSTRAINT "FK_5e35574dd85d72e2a4b4712bbc2" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_exercise_attachment" ADD CONSTRAINT "FK_c489cd5add72929aa7806fd9b34" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_exercise_attachment" ADD CONSTRAINT "FK_ea613a86f6db6b7e8f2d11e2763" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_annex_attachment_translation" ADD CONSTRAINT "FK_a202af85969c63978fe81fc6814" FOREIGN KEY ("translatableId") REFERENCES "mission_annex_attachment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_annex_attachment" ADD CONSTRAINT "FK_9e6206ccd7849477cf04fc07be0" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_annex_attachment" ADD CONSTRAINT "FK_2bc1e6ca64083ea3c7e589bd904" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_annex_attachment" ADD CONSTRAINT "FK_57ec78cae7d1d0894ca94ab4f19" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission_annex_attachment" DROP CONSTRAINT "FK_57ec78cae7d1d0894ca94ab4f19"`);
        await queryRunner.query(`ALTER TABLE "mission_annex_attachment" DROP CONSTRAINT "FK_2bc1e6ca64083ea3c7e589bd904"`);
        await queryRunner.query(`ALTER TABLE "mission_annex_attachment" DROP CONSTRAINT "FK_9e6206ccd7849477cf04fc07be0"`);
        await queryRunner.query(`ALTER TABLE "mission_annex_attachment_translation" DROP CONSTRAINT "FK_a202af85969c63978fe81fc6814"`);
        await queryRunner.query(`ALTER TABLE "mission_exercise_attachment" DROP CONSTRAINT "FK_ea613a86f6db6b7e8f2d11e2763"`);
        await queryRunner.query(`ALTER TABLE "mission_exercise_attachment" DROP CONSTRAINT "FK_c489cd5add72929aa7806fd9b34"`);
        await queryRunner.query(`ALTER TABLE "mission_exercise_attachment" DROP CONSTRAINT "FK_5e35574dd85d72e2a4b4712bbc2"`);
        await queryRunner.query(`ALTER TABLE "mission_exercise_attachment_translation" DROP CONSTRAINT "FK_b2d6ef9b2d39a7a78ecce1ed130"`);
        await queryRunner.query(`ALTER TABLE "mission_lesson_attachment" DROP CONSTRAINT "FK_b29af43379cc7c0388376c0042f"`);
        await queryRunner.query(`ALTER TABLE "mission_lesson_attachment" DROP CONSTRAINT "FK_5756e1216cefbc4e2fc0477ae38"`);
        await queryRunner.query(`ALTER TABLE "mission_lesson_attachment" DROP CONSTRAINT "FK_ca05494b220758c5e2a2d46c7d5"`);
        await queryRunner.query(`ALTER TABLE "mission_lesson_attachment_translation" DROP CONSTRAINT "FK_c5d1f4e91cd1cb98320fb139573"`);
        await queryRunner.query(`DROP TABLE "mission_annex_attachment"`);
        await queryRunner.query(`DROP TABLE "mission_annex_attachment_translation"`);
        await queryRunner.query(`DROP TABLE "mission_exercise_attachment"`);
        await queryRunner.query(`DROP TABLE "mission_exercise_attachment_translation"`);
        await queryRunner.query(`DROP TABLE "mission_lesson_attachment"`);
        await queryRunner.query(`DROP TABLE "mission_lesson_attachment_translation"`);
    }

}
