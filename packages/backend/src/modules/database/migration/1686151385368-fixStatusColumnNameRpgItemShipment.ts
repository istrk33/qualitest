import { MigrationInterface, QueryRunner } from "typeorm";

export class FixStatusColumnNameRpgItemShipment1686151385368 implements MigrationInterface {
    name = 'FixStatusColumnNameRpgItemShipment1686151385368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_shipment" RENAME COLUMN "shipment_status" TO "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_shipment" RENAME COLUMN "status" TO "shipment_status"`);
    }

}
