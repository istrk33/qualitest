import { MigrationInterface, QueryRunner } from "typeorm";

export class SubjectLevelNullableEloMax1696336492895 implements MigrationInterface {
    name = 'SubjectLevelNullableEloMax1696336492895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_level" ALTER COLUMN "elo_max" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_level" ALTER COLUMN "elo_max" SET NOT NULL`);
    }

}
