import { MigrationInterface, QueryRunner } from "typeorm";

export class linkOrderToCurrencyAndToOrderItems1681210295015 implements MigrationInterface {
    name = 'linkOrderToCurrencyAndToOrderItems1681210295015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD "amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "currencyId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_wallet" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "user_wallet" ADD "amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_fc51d35e5da294191f843c56d46" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_fc51d35e5da294191f843c56d46"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "user_wallet" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "user_wallet" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "currencyId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`);
    }

}
