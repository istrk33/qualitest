import { MigrationInterface, QueryRunner } from "typeorm";

export class addImageToUserEntity1678187436488 implements MigrationInterface {
    name = 'addImageToUserEntity1678187436488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
