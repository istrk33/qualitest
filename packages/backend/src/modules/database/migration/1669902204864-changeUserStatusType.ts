import { MigrationInterface, QueryRunner } from "typeorm";

export class changeUserStatusType1669902204864 implements MigrationInterface {
    name = 'changeUserStatusType1669902204864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "status" TO "is_active"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_active" character varying NOT NULL DEFAULT 'INACTIVE'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "is_active" TO "status"`);
    }

}
