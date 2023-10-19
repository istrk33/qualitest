import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderFix1697714885092 implements MigrationInterface {
    name = 'OrderFix1697714885092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "products"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "products" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "products"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "products" jsonb`);
    }

}
