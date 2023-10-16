import { MigrationInterface, QueryRunner } from "typeorm";

export class FixGemsToUser1686733015780 implements MigrationInterface {
    name = 'FixGemsToUser1686733015780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "gems" integer NOT NULL DEFAULT '5'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gems"`);
    }

}
