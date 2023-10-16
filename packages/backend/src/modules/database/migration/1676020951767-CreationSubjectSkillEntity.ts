import { MigrationInterface, QueryRunner } from "typeorm";

export class CreationSubjectSkillEntity1676020951767 implements MigrationInterface {
    name = 'CreationSubjectSkillEntity1676020951767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_c8b543e5104452e7e0499e415dd" UNIQUE ("title"), CONSTRAINT "UQ_ef0737377a2d5f38b004755d3fe" UNIQUE ("description"), CONSTRAINT "PK_4a1d921d43f2abea977aa434b5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level" integer NOT NULL, "obsolete" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "obsoleted_at" TIMESTAMP NOT NULL DEFAULT now(), "replace_at" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, "updatedById" uuid, "obsoletedById" uuid, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_bcffbae3a932d9dfd6023a749c2" UNIQUE ("title"), CONSTRAINT "UQ_279c5bdffc40fd9a1a3bff24664" UNIQUE ("description"), CONSTRAINT "PK_4c3c1d503f974e01de838ffd53d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_category_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_d9009fc72c75d58ee6b7437e420" UNIQUE ("title"), CONSTRAINT "UQ_1c62c7ec468a16018c54871bac3" UNIQUE ("description"), CONSTRAINT "PK_be9c1ae37990720547978d88f51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_cdfdfaec1e0c2b800d62e06e1b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "skill_translation" ADD CONSTRAINT "FK_e095990b68c4f78946ac1402517" FOREIGN KEY ("translatableId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_4de4501583cd1fcd6f5ea85f547" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_f4f84fc740636dfca1d47380407" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_403ad9da09f95823bc01384866c" FOREIGN KEY ("obsoletedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_translation" ADD CONSTRAINT "FK_445c46d248a2dfc78cc27a3a6df" FOREIGN KEY ("translatableId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_23afa3fe247dfa71631cb64945c" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_78436e76c0b05fe7ee970ad5a28" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_category_translation" ADD CONSTRAINT "FK_9544f79d0279b52683b8758d163" FOREIGN KEY ("translatableId") REFERENCES "subject_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_category" ADD CONSTRAINT "FK_fd3821617ba9c3df3b665e55e59" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_category" ADD CONSTRAINT "FK_91074bd66f20714ca5c51e1386a" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_category" DROP CONSTRAINT "FK_91074bd66f20714ca5c51e1386a"`);
        await queryRunner.query(`ALTER TABLE "subject_category" DROP CONSTRAINT "FK_fd3821617ba9c3df3b665e55e59"`);
        await queryRunner.query(`ALTER TABLE "subject_category_translation" DROP CONSTRAINT "FK_9544f79d0279b52683b8758d163"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_78436e76c0b05fe7ee970ad5a28"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_23afa3fe247dfa71631cb64945c"`);
        await queryRunner.query(`ALTER TABLE "subject_translation" DROP CONSTRAINT "FK_445c46d248a2dfc78cc27a3a6df"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_403ad9da09f95823bc01384866c"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_f4f84fc740636dfca1d47380407"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_4de4501583cd1fcd6f5ea85f547"`);
        await queryRunner.query(`ALTER TABLE "skill_translation" DROP CONSTRAINT "FK_e095990b68c4f78946ac1402517"`);
        await queryRunner.query(`DROP TABLE "subject_category"`);
        await queryRunner.query(`DROP TABLE "subject_category_translation"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "subject_translation"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "skill_translation"`);
    }

}
