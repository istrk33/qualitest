import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderStatusEnum1682416552823 implements MigrationInterface {
    name = 'OrderStatusEnum1682416552823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'CART'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
