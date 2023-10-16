import { MigrationInterface, QueryRunner } from "typeorm";

export class DenormalizeInventoryItemRelationToOrderItem1686133052408 implements MigrationInterface {
    name = 'DenormalizeInventoryItemRelationToOrderItem1686133052408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "order_item_id" uuid`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "UQ_70a90ff2966871b324b13137f09" UNIQUE ("order_item_id")`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_70a90ff2966871b324b13137f09" FOREIGN KEY ("order_item_id") REFERENCES "order_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_70a90ff2966871b324b13137f09"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "UQ_70a90ff2966871b324b13137f09"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "order_item_id"`);
    }

}
