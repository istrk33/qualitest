import { MigrationInterface, QueryRunner } from "typeorm";

export class MultipleInventoryItemsByOrderItem1688375020317 implements MigrationInterface {
    name = 'MultipleInventoryItemsByOrderItem1688375020317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_16aae86f5b63cd87b296d1016c5"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" RENAME COLUMN "orderItemsId" TO "orderItemId"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_f8435754b45a76cfb923007d896" FOREIGN KEY ("orderItemId") REFERENCES "order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_f8435754b45a76cfb923007d896"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" RENAME COLUMN "orderItemId" TO "orderItemsId"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_16aae86f5b63cd87b296d1016c5" FOREIGN KEY ("orderItemsId") REFERENCES "order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
