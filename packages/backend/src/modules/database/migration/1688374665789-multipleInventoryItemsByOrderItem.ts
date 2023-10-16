import { MigrationInterface, QueryRunner } from "typeorm";

export class MultipleInventoryItemsByOrderItem1688374665789 implements MigrationInterface {
    name = 'MultipleInventoryItemsByOrderItem1688374665789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_70a90ff2966871b324b13137f09"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" RENAME COLUMN "order_item_id" TO "orderItemsId"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" RENAME CONSTRAINT "UQ_70a90ff2966871b324b13137f09" TO "UQ_16aae86f5b63cd87b296d1016c5"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "UQ_16aae86f5b63cd87b296d1016c5"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_16aae86f5b63cd87b296d1016c5" FOREIGN KEY ("orderItemsId") REFERENCES "order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_16aae86f5b63cd87b296d1016c5"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "UQ_16aae86f5b63cd87b296d1016c5" UNIQUE ("orderItemsId")`);
        await queryRunner.query(`ALTER TABLE "inventory_item" RENAME CONSTRAINT "UQ_16aae86f5b63cd87b296d1016c5" TO "UQ_70a90ff2966871b324b13137f09"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" RENAME COLUMN "orderItemsId" TO "order_item_id"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_70a90ff2966871b324b13137f09" FOREIGN KEY ("order_item_id") REFERENCES "order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
