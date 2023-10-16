import { MigrationInterface, QueryRunner } from "typeorm";

export class addDiscountPriceProductVariant1673259546385 implements MigrationInterface {
    name = 'addDiscountPriceProductVariant1673259546385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "discountPrice" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "discountPrice"`);
    }

}
