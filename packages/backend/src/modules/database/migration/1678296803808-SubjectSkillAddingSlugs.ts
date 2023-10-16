import { MigrationInterface, QueryRunner } from "typeorm";

export class SubjectSkillAddingSlugs1678296803808 implements MigrationInterface {
    name = 'SubjectSkillAddingSlugs1678296803808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_category" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skill" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "subject_category" DROP COLUMN "slug"`);
    }

}
