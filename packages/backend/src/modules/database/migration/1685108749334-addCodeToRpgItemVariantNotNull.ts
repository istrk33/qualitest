import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCodeToRpgItemVariantNotNull1685108749334 implements MigrationInterface {
    name = 'AddCodeToRpgItemVariantNotNull1685108749334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ALTER COLUMN "code" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ALTER COLUMN "code" DROP NOT NULL`);
    }

}
