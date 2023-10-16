import { MigrationInterface, QueryRunner } from "typeorm";

export class changeUserBirthdateToDate1667818600791 implements MigrationInterface {
    name = 'changeUserBirthdateToDate1667818600791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_detail" DROP COLUMN "birth_date"`);
        await queryRunner.query(`ALTER TABLE "users_detail" ADD "birth_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_detail" DROP COLUMN "birth_date"`);
        await queryRunner.query(`ALTER TABLE "users_detail" ADD "birth_date" character varying`);
    }

}
