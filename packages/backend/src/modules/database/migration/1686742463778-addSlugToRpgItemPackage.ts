import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToRpgItemPackage1686742463778 implements MigrationInterface {
    name = 'AddSlugToRpgItemPackage1686742463778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_package" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_package" DROP COLUMN "slug"`);
    }

}
