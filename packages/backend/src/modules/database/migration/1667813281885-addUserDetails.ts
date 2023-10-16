import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserDetails1667813281885 implements MigrationInterface {
    name = 'addUserDetails1667813281885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email_business" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email_business"`);
    }

}
