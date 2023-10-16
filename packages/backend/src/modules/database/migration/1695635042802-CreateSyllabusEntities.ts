import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSyllabusEntities1695635042802 implements MigrationInterface {
    name = 'CreateSyllabusEntities1695635042802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "syllabus_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_7c58bf4d4a30ebfe43f79c21e76" UNIQUE ("title"), CONSTRAINT "PK_e5839c334426c92976a524921d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "syllabus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "file" character varying, "writedById" uuid NOT NULL, "subjectId" uuid NOT NULL, CONSTRAINT "PK_5205bdbdb2d719615ccf5eabfb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "syllabus_translation" ADD CONSTRAINT "FK_e24b7bd35edd461b079b452c6d4" FOREIGN KEY ("translatableId") REFERENCES "syllabus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabus" ADD CONSTRAINT "FK_583cb25705a35a648177c0dfec1" FOREIGN KEY ("writedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabus" ADD CONSTRAINT "FK_e71dd6268f0fcb514d6684f84e6" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabus" DROP CONSTRAINT "FK_e71dd6268f0fcb514d6684f84e6"`);
        await queryRunner.query(`ALTER TABLE "syllabus" DROP CONSTRAINT "FK_583cb25705a35a648177c0dfec1"`);
        await queryRunner.query(`ALTER TABLE "syllabus_translation" DROP CONSTRAINT "FK_e24b7bd35edd461b079b452c6d4"`);
        await queryRunner.query(`DROP TABLE "syllabus"`);
        await queryRunner.query(`DROP TABLE "syllabus_translation"`);
    }

}
