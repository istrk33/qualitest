import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProductRpgItemPackage1686756350015 implements MigrationInterface {
    name = 'FixProductRpgItemPackage1686756350015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_package" RENAME COLUMN "price" TO "product_id"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" ADD "product_id" uuid`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" ADD CONSTRAINT "UQ_edaf9743c552999cf71332d0123" UNIQUE ("product_id")`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" ADD CONSTRAINT "FK_edaf9743c552999cf71332d0123" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_package" DROP CONSTRAINT "FK_edaf9743c552999cf71332d0123"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" DROP CONSTRAINT "UQ_edaf9743c552999cf71332d0123"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" ADD "product_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" RENAME COLUMN "product_id" TO "price"`);
    }

}
