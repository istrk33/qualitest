import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubjectLevelEntities1696335785521 implements MigrationInterface {
    name = 'CreateSubjectLevelEntities1696335785521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject_level_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_649c4924409073ce687fddb25be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_level" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "elo_min" integer NOT NULL, "elo_max" integer NOT NULL, "esport_equivalence" character varying, "subjectId" uuid, CONSTRAINT "PK_49e19667f2ea3a062ace64fe1c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subject_level_translation" ADD CONSTRAINT "FK_715d6a635558394319e602499c5" FOREIGN KEY ("translatableId") REFERENCES "subject_level"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_level" ADD CONSTRAINT "FK_5b7b49871251df82257bf765e28" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_level" DROP CONSTRAINT "FK_5b7b49871251df82257bf765e28"`);
        await queryRunner.query(`ALTER TABLE "subject_level_translation" DROP CONSTRAINT "FK_715d6a635558394319e602499c5"`);
        await queryRunner.query(`DROP TABLE "subject_level"`);
        await queryRunner.query(`DROP TABLE "subject_level_translation"`);
    }

}
