import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHasBeenApprovedToUserChallenge1690271721457 implements MigrationInterface {
    name = 'AddHasBeenApprovedToUserChallenge1690271721457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" ADD "has_been_approved" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_challenge" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" ALTER COLUMN "status" SET DEFAULT 'WAITING'`);
        await queryRunner.query(`ALTER TABLE "user_challenge" DROP COLUMN "has_been_approved"`);
    }

}
