import { MigrationInterface, QueryRunner } from "typeorm";

export class RpgItemShipment1686140105427 implements MigrationInterface {
    name = 'RpgItemShipment1686140105427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rpg_item_shipment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "shipment_status" character varying NOT NULL DEFAULT 'WAITING', "inventory_item_id" uuid, CONSTRAINT "REL_3109bbe9ff5bf4071a9574923f" UNIQUE ("inventory_item_id"), CONSTRAINT "PK_ab754e66b12e171f1a2d14b62c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rpg_item_shipment" ADD CONSTRAINT "FK_3109bbe9ff5bf4071a9574923f5" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_shipment" DROP CONSTRAINT "FK_3109bbe9ff5bf4071a9574923f5"`);
        await queryRunner.query(`DROP TABLE "rpg_item_shipment"`);
    }

}
