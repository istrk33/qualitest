import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToChallenge1689952623136 implements MigrationInterface {
    name = 'AddSlugToChallenge1689952623136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "slug"`);
    }

}
