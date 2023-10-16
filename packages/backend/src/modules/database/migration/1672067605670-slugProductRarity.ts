import { MigrationInterface, QueryRunner } from "typeorm";

export class slugProductRarity1672067605670 implements MigrationInterface {
    name = 'slugProductRarity1672067605670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_rarity" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_rarity" DROP COLUMN "slug"`);
    }

}
