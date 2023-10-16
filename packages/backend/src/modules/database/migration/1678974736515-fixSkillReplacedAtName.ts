import { MigrationInterface, QueryRunner } from "typeorm";

export class fixSkillReplacedAtName1678974736515 implements MigrationInterface {
    name = 'fixSkillReplacedAtName1678974736515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" RENAME COLUMN "replace_at" TO "replaced_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" RENAME COLUMN "replaced_at" TO "replace_at"`);
    }

}
