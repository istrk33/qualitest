import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePriceEntityDuplicateFields1682946349899 implements MigrationInterface {
    name = 'RemovePriceEntityDuplicateFields1682946349899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP COLUMN "discount_start"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP COLUMN "discount_end"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD "discount_end" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD "discount_start" TIMESTAMP DEFAULT now()`);
    }

}
