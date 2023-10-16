import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRpgItemEntity1682604127201 implements MigrationInterface {
    name = 'FixRpgItemEntity1682604127201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP CONSTRAINT "FK_4912204fa4794df9f919e716d02"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD CONSTRAINT "FK_4912204fa4794df9f919e716d02" FOREIGN KEY ("rpgItemId") REFERENCES "rpg_item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP CONSTRAINT "FK_4912204fa4794df9f919e716d02"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD CONSTRAINT "FK_4912204fa4794df9f919e716d02" FOREIGN KEY ("rpgItemId") REFERENCES "rpg_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
