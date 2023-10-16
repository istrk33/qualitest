import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePackageItemEntity1686741990197 implements MigrationInterface {
    name = 'CreatePackageItemEntity1686741990197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rpg_item_package_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "localeCode" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_66e2243c1c9e4670e2a063dbf1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_package" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isSaleable" boolean NOT NULL DEFAULT true, "price" integer NOT NULL, "image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, CONSTRAINT "PK_734cd528a7c3f7dcf529f6fd4d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_variant_package" ("rpg_item_variant_id" uuid NOT NULL, "rpg_item_package_id" uuid NOT NULL, CONSTRAINT "PK_030630b384794b372ec2c4630a5" PRIMARY KEY ("rpg_item_variant_id", "rpg_item_package_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f330c232b02daa2dad8dd6b099" ON "rpg_item_variant_package" ("rpg_item_variant_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a6a3410d47cef86606c24339d" ON "rpg_item_variant_package" ("rpg_item_package_id") `);
        await queryRunner.query(`ALTER TABLE "rpg_item_package_translation" ADD CONSTRAINT "FK_10b871cb18fa3134f96f8a5b871" FOREIGN KEY ("translatableId") REFERENCES "rpg_item_package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_package" ADD CONSTRAINT "FK_f330c232b02daa2dad8dd6b099c" FOREIGN KEY ("rpg_item_variant_id") REFERENCES "rpg_item_package"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_package" ADD CONSTRAINT "FK_2a6a3410d47cef86606c24339d8" FOREIGN KEY ("rpg_item_package_id") REFERENCES "rpg_item_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_package" DROP CONSTRAINT "FK_2a6a3410d47cef86606c24339d8"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_package" DROP CONSTRAINT "FK_f330c232b02daa2dad8dd6b099c"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_package_translation" DROP CONSTRAINT "FK_10b871cb18fa3134f96f8a5b871"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a6a3410d47cef86606c24339d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f330c232b02daa2dad8dd6b099"`);
        await queryRunner.query(`DROP TABLE "rpg_item_variant_package"`);
        await queryRunner.query(`DROP TABLE "rpg_item_package"`);
        await queryRunner.query(`DROP TABLE "rpg_item_package_translation"`);
    }

}
