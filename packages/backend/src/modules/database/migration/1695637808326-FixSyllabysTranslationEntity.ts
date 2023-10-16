import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSyllabysTranslationEntity1695637808326 implements MigrationInterface {
    name = 'FixSyllabysTranslationEntity1695637808326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabus_translation" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabus_translation" ADD "description" character varying NOT NULL`);
    }

}
