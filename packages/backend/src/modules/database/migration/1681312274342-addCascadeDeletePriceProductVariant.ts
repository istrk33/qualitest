import { MigrationInterface, QueryRunner } from "typeorm";

export class addCascadeDeletePriceProductVariant1681312274342 implements MigrationInterface {
    name = 'addCascadeDeletePriceProductVariant1681312274342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_price" DROP CONSTRAINT "FK_5842f603bd85d924127d63d73cd"`);
        await queryRunner.query(`ALTER TABLE "product_variant_discount_price" DROP CONSTRAINT "FK_6161a42857b1a5fb51fb95cb3dc"`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" ADD CONSTRAINT "FK_5842f603bd85d924127d63d73cd" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_variant_discount_price" ADD CONSTRAINT "FK_6161a42857b1a5fb51fb95cb3dc" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_discount_price" DROP CONSTRAINT "FK_6161a42857b1a5fb51fb95cb3dc"`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" DROP CONSTRAINT "FK_5842f603bd85d924127d63d73cd"`);
        await queryRunner.query(`ALTER TABLE "product_variant_discount_price" ADD CONSTRAINT "FK_6161a42857b1a5fb51fb95cb3dc" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" ADD CONSTRAINT "FK_5842f603bd85d924127d63d73cd" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
