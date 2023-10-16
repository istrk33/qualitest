import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameRpgItemTables1682583190791 implements MigrationInterface {
    name = 'RenameRpgItemTables1682583190791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rpg_item_variant_option_value" ("rpgItemVariantId" uuid NOT NULL, "rpgItemOptionValueId" uuid NOT NULL, CONSTRAINT "PK_f829487f503b8e590b2bdee1d64" PRIMARY KEY ("rpgItemVariantId", "rpgItemOptionValueId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d3942e3bb182e71fd1664d124" ON "rpg_item_variant_option_value" ("rpgItemVariantId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c5c83e10c8e6a3e2da1f67b13" ON "rpg_item_variant_option_value" ("rpgItemOptionValueId") `);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_option_value" ADD CONSTRAINT "FK_4d3942e3bb182e71fd1664d124c" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpg_item_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_option_value" ADD CONSTRAINT "FK_3c5c83e10c8e6a3e2da1f67b13f" FOREIGN KEY ("rpgItemOptionValueId") REFERENCES "rpg_item_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_option_value" DROP CONSTRAINT "FK_3c5c83e10c8e6a3e2da1f67b13f"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_option_value" DROP CONSTRAINT "FK_4d3942e3bb182e71fd1664d124c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c5c83e10c8e6a3e2da1f67b13"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4d3942e3bb182e71fd1664d124"`);
        await queryRunner.query(`DROP TABLE "rpg_item_variant_option_value"`);
    }

}
