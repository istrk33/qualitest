import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUpdtatedByToRpgPackage1686757573562 implements MigrationInterface {
    name = 'AddUpdtatedByToRpgPackage1686757573562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_package" RENAME COLUMN "updated_by" TO "updatedById"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" DROP COLUMN "updatedById"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" ADD "updatedById" uuid`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" ADD CONSTRAINT "FK_690878ed96222cd2da8fc9bd374" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_package" DROP CONSTRAINT "FK_690878ed96222cd2da8fc9bd374"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" DROP COLUMN "updatedById"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" ADD "updatedById" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package" RENAME COLUMN "updatedById" TO "updated_by"`);
    }

}
