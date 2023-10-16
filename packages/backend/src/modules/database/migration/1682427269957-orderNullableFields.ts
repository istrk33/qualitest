import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderNullableFields1682427269957 implements MigrationInterface {
    name = 'OrderNullableFields1682427269957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "amount" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "amount" SET NOT NULL`);
    }

}
