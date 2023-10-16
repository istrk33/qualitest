import { MigrationInterface, QueryRunner } from "typeorm";

export class productCatRarity1671806936524 implements MigrationInterface {
    name = 'productCatRarity1671806936524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_category_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_ee9bfedc637b0ded3bcd8258ca1" UNIQUE ("title"), CONSTRAINT "PK_40ac21f239e150f3568da259974" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" character varying NOT NULL, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_rarity_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_480ef26f47280df843e9e4d190a" UNIQUE ("title"), CONSTRAINT "PK_b3a6f0fe3936359bc6884a343fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_rarity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" character varying NOT NULL, CONSTRAINT "PK_4058d76687c5da56e434bf741ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_category_translation" ADD CONSTRAINT "FK_37ead38ff61d5dc02d16f772bbd" FOREIGN KEY ("translatableId") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_rarity_translation" ADD CONSTRAINT "FK_8d82a9c906015692920647bf6de" FOREIGN KEY ("translatableId") REFERENCES "product_rarity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_rarity_translation" DROP CONSTRAINT "FK_8d82a9c906015692920647bf6de"`);
        await queryRunner.query(`ALTER TABLE "product_category_translation" DROP CONSTRAINT "FK_37ead38ff61d5dc02d16f772bbd"`);
        await queryRunner.query(`DROP TABLE "product_rarity"`);
        await queryRunner.query(`DROP TABLE "product_rarity_translation"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "product_category_translation"`);
    }

}
