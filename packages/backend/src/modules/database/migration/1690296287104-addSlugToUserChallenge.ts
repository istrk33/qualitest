import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToUserChallenge1690296287104 implements MigrationInterface {
    name = 'AddSlugToUserChallenge1690296287104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" DROP COLUMN "slug"`);
    }

}
