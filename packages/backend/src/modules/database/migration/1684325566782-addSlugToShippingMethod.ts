import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToShippingMethod1684325566782 implements MigrationInterface {
    name = 'AddSlugToShippingMethod1684325566782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_method" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_method" DROP COLUMN "slug"`);
    }

}
