import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsUsedToInventoryItem1685029037843 implements MigrationInterface {
    name = 'AddIsUsedToInventoryItem1685029037843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "is_used" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "is_used"`);
    }

}
