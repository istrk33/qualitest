import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderItemNullableFields1682427899724 implements MigrationInterface {
    name = 'OrderItemNullableFields1682427899724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "amount" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "amount" SET NOT NULL`);
    }

}
