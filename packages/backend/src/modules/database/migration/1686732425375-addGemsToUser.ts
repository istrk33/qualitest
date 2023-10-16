import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGemsToUser1686732425375 implements MigrationInterface {
    name = 'AddGemsToUser1686732425375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lifes" SET DEFAULT '3'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lifes" SET DEFAULT '5'`);
    }

}
