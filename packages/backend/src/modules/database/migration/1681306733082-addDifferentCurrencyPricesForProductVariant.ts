import { MigrationInterface, QueryRunner } from "typeorm";

export class addDifferentCurrencyPricesForProductVariant1681306733082 implements MigrationInterface {
    name = 'addDifferentCurrencyPricesForProductVariant1681306733082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_variant_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "productVariantId" uuid, "currencyId" uuid, CONSTRAINT "PK_ba659ff2940702124e799c5c854" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant_discount_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "productVariantId" uuid, "currencyId" uuid, CONSTRAINT "PK_8caf7951366ef4058f4eef097a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "discountPrice"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" ADD CONSTRAINT "FK_5842f603bd85d924127d63d73cd" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" ADD CONSTRAINT "FK_8a6b9e768dff7ca998c05cdd459" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_discount_price" ADD CONSTRAINT "FK_6161a42857b1a5fb51fb95cb3dc" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_discount_price" ADD CONSTRAINT "FK_f97a724d0507d547a8be83fb49f" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_discount_price" DROP CONSTRAINT "FK_f97a724d0507d547a8be83fb49f"`);
        await queryRunner.query(`ALTER TABLE "product_variant_discount_price" DROP CONSTRAINT "FK_6161a42857b1a5fb51fb95cb3dc"`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" DROP CONSTRAINT "FK_8a6b9e768dff7ca998c05cdd459"`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" DROP CONSTRAINT "FK_5842f603bd85d924127d63d73cd"`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "discountPrice" double precision`);
        await queryRunner.query(`DROP TABLE "product_variant_discount_price"`);
        await queryRunner.query(`DROP TABLE "product_variant_price"`);
    }

}
