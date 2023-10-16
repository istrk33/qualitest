import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableToAmountDiscountPrice1685535013686 implements MigrationInterface {
    name = 'AddNullableToAmountDiscountPrice1685535013686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_discount_price" ALTER COLUMN "amount" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_discount_price" ALTER COLUMN "amount" SET NOT NULL`);
    }

}
