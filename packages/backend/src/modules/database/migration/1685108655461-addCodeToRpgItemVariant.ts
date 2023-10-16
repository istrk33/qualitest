import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCodeToRpgItemVariant1685108655461 implements MigrationInterface {
    name = 'AddCodeToRpgItemVariant1685108655461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD "code" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP COLUMN "code"`);
    }

}
