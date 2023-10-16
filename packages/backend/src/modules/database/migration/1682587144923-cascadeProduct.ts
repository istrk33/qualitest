import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeProduct1682587144923 implements MigrationInterface {
    name = 'CascadeProduct1682587144923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP CONSTRAINT "FK_c33cab97c45fd9f58806a8434a8"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD CONSTRAINT "FK_c33cab97c45fd9f58806a8434a8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP CONSTRAINT "FK_c33cab97c45fd9f58806a8434a8"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD CONSTRAINT "FK_c33cab97c45fd9f58806a8434a8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
