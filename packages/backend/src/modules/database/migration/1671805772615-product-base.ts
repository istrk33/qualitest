import { MigrationInterface, QueryRunner } from "typeorm";

export class productBase1671805772615 implements MigrationInterface {
    name = 'productBase1671805772615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_ecd2d51ed71611de02d0e3ede00" UNIQUE ("title"), CONSTRAINT "PK_62d00fbc92e7a495701d6fee9d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_translation" ADD CONSTRAINT "FK_90e902e26813fbb46eb995858ea" FOREIGN KEY ("translatableId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_translation" DROP CONSTRAINT "FK_90e902e26813fbb46eb995858ea"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_translation"`);
    }

}
