import { MigrationInterface, QueryRunner } from "typeorm";

export class SetNullInventoryItemOnDelete1686570130175 implements MigrationInterface {
    name = 'SetNullInventoryItemOnDelete1686570130175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_shipment" DROP CONSTRAINT "FK_3109bbe9ff5bf4071a9574923f5"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_shipment" ADD CONSTRAINT "FK_3109bbe9ff5bf4071a9574923f5" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_shipment" DROP CONSTRAINT "FK_3109bbe9ff5bf4071a9574923f5"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_shipment" ADD CONSTRAINT "FK_3109bbe9ff5bf4071a9574923f5" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
