import { MigrationInterface, QueryRunner } from "typeorm";

export class addTranslationToProductVariant1681286691211 implements MigrationInterface {
    name = 'addTranslationToProductVariant1681286691211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_variant_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_9c0e6f96d418516b83e4538bec2" UNIQUE ("title"), CONSTRAINT "PK_4b7f882e2b669800bed7ed065f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discountPrice" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_start" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_end" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" ADD CONSTRAINT "FK_fd0b2f5043388b04dbc2acf70c9" FOREIGN KEY ("translatableId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_translation" DROP CONSTRAINT "FK_fd0b2f5043388b04dbc2acf70c9"`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_end" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_start" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discountPrice" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "product_variant_translation"`);
    }

}
