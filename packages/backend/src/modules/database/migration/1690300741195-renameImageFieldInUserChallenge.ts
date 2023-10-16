import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameImageFieldInUserChallenge1690300741195 implements MigrationInterface {
    name = 'RenameImageFieldInUserChallenge1690300741195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" RENAME COLUMN "image" TO "proof"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" RENAME COLUMN "proof" TO "image"`);
    }

}
