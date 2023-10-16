import { MigrationInterface, QueryRunner } from "typeorm";

export class addSlugProduct1672847402173 implements MigrationInterface {
    name = 'addSlugProduct1672847402173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "slug"`);
    }

}
