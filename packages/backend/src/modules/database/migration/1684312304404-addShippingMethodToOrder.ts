import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShippingMethodToOrder1684312304404 implements MigrationInterface {
    name = 'AddShippingMethodToOrder1684312304404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingMethodId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_660cb111d798297b9140c08c791" FOREIGN KEY ("shippingMethodId") REFERENCES "shipping_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_660cb111d798297b9140c08c791"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingMethodId"`);
    }

}
