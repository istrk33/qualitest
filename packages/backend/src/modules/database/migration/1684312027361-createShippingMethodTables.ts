import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShippingMethodTables1684312027361 implements MigrationInterface {
    name = 'CreateShippingMethodTables1684312027361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shipping_method_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_a96b0f07fa6d37846c6317e6c9e" UNIQUE ("title"), CONSTRAINT "PK_b862a1fac1c6e1fd201eadadbcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_method_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "productId" uuid, "currencyId" uuid, CONSTRAINT "PK_7e183d1b7643c9fc839a556c702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b9b0adfad3c6b99229c1e7d4865" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shipping_method_translation" ADD CONSTRAINT "FK_c3bba0bc37ac7356ea080d59558" FOREIGN KEY ("translatableId") REFERENCES "shipping_method"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping_method_price" ADD CONSTRAINT "FK_d440494a0c5ec3a447fee40c5fb" FOREIGN KEY ("productId") REFERENCES "shipping_method"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shipping_method_price" ADD CONSTRAINT "FK_d91ba054bb66ff5267dcf96cf35" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_method_price" DROP CONSTRAINT "FK_d91ba054bb66ff5267dcf96cf35"`);
        await queryRunner.query(`ALTER TABLE "shipping_method_price" DROP CONSTRAINT "FK_d440494a0c5ec3a447fee40c5fb"`);
        await queryRunner.query(`ALTER TABLE "shipping_method_translation" DROP CONSTRAINT "FK_c3bba0bc37ac7356ea080d59558"`);
        await queryRunner.query(`DROP TABLE "shipping_method"`);
        await queryRunner.query(`DROP TABLE "shipping_method_price"`);
        await queryRunner.query(`DROP TABLE "shipping_method_translation"`);
    }

}
