import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShipingAddressDetailToOrder1684746278284 implements MigrationInterface {
    name = 'AddShipingAddressDetailToOrder1684746278284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddress"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddressName" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddressStreet" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddressCity" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddressZipCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddressZipCode"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddressCity"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddressStreet"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddressName"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddress" character varying`);
    }

}
