import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCreateUserElo1696319002637 implements MigrationInterface {
    name = 'FixCreateUserElo1696319002637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_elo" ALTER COLUMN "currentElo" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_elo" ALTER COLUMN "currentElo" DROP DEFAULT`);
    }

}
