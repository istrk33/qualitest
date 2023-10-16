import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyNameInventoryItemEntity1685022981378 implements MigrationInterface {
    name = 'ModifyNameInventoryItemEntity1685022981378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "rpgItemVariantId" uuid, "userId" uuid, CONSTRAINT "PK_94f5cbcb5f280f2f30bd4a9fd90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_266c12b618cf2987953ab28086c" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpg_item_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_76c3dd2c365117171d3b25b772d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_76c3dd2c365117171d3b25b772d"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_266c12b618cf2987953ab28086c"`);
        await queryRunner.query(`DROP TABLE "inventory_item"`);
    }

}
