import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLifesToUSer1685958636899 implements MigrationInterface {
    name = 'AddLifesToUSer1685958636899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lifes" integer NOT NULL DEFAULT '3'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lifes"`);
    }

}
