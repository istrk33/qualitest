import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValueToChallengeDate1689940908866 implements MigrationInterface {
    name = 'AddDefaultValueToChallengeDate1689940908866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "isPublished"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "publishedFrom"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "publishedUntil"`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "is_published" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "published_from" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "published_until" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "published_until"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "published_from"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "is_published"`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "publishedUntil" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "publishedFrom" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "isPublished" boolean NOT NULL`);
    }

}
