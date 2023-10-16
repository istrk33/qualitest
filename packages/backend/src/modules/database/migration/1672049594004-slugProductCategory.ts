import { MigrationInterface, QueryRunner } from "typeorm";

export class slugProductCategory1672049594004 implements MigrationInterface {
    name = 'slugProductCategory1672049594004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category" DROP COLUMN "slug"`);
    }

}
