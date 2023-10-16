import { MigrationInterface, QueryRunner } from "typeorm";

export class productVariant1672930959912 implements MigrationInterface {
    name = 'productVariant1672930959912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_variant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "price" double precision NOT NULL, "discount_start" TIMESTAMP NOT NULL DEFAULT now(), "discount_end" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant_option_value" ("productVariantId" uuid NOT NULL, "productOptionValueId" uuid NOT NULL, CONSTRAINT "PK_c367f8100873a1c6e858deb4251" PRIMARY KEY ("productVariantId", "productOptionValueId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4b0c1c28c70e8dfcf9d85f30f8" ON "product_variant_option_value" ("productVariantId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f49888f627edc71defcc03a97" ON "product_variant_option_value" ("productOptionValueId") `);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "FK_6e420052844edf3a5506d863ce6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_option_value" ADD CONSTRAINT "FK_4b0c1c28c70e8dfcf9d85f30f8f" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_variant_option_value" ADD CONSTRAINT "FK_3f49888f627edc71defcc03a974" FOREIGN KEY ("productOptionValueId") REFERENCES "product_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_option_value" DROP CONSTRAINT "FK_3f49888f627edc71defcc03a974"`);
        await queryRunner.query(`ALTER TABLE "product_variant_option_value" DROP CONSTRAINT "FK_4b0c1c28c70e8dfcf9d85f30f8f"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_6e420052844edf3a5506d863ce6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f49888f627edc71defcc03a97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b0c1c28c70e8dfcf9d85f30f8"`);
        await queryRunner.query(`DROP TABLE "product_variant_option_value"`);
        await queryRunner.query(`DROP TABLE "product_variant"`);
    }

}
