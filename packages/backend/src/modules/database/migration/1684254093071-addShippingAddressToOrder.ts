import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShippingAddressToOrder1684254093071 implements MigrationInterface {
    name = 'AddShippingAddressToOrder1684254093071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddress" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddress"`);
    }

}
