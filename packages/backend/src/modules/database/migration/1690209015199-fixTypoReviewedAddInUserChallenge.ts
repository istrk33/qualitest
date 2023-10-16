import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTypoReviewedAddInUserChallenge1690209015199 implements MigrationInterface {
    name = 'FixTypoReviewedAddInUserChallenge1690209015199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" ALTER COLUMN "reviewed_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_challenge" ALTER COLUMN "status" SET DEFAULT 'WAITING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_challenge" ALTER COLUMN "reviewed_at" SET NOT NULL`);
    }

}
