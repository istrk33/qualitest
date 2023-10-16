import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGemToUser1686732057379 implements MigrationInterface {
    name = 'AddGemToUser1686732057379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lifes" SET DEFAULT '5'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lifes" SET DEFAULT '3'`);
    }

}
