import { MigrationInterface, QueryRunner } from "typeorm";

export class productOptionValues1672158897099 implements MigrationInterface {
    name = 'productOptionValues1672158897099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_option_value_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_80770ac93a5c2f127b71a37a3e4" UNIQUE ("title"), CONSTRAINT "PK_30da06ff40697d7c11fc557b1ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_option_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "productOptionId" uuid, CONSTRAINT "PK_2ab71ed3b21be5800905c621535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_option_value_translation" ADD CONSTRAINT "FK_ad5ebfe4748c917d8107eadc2f0" FOREIGN KEY ("translatableId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_50616b8f91823143e1c2524c034" FOREIGN KEY ("productOptionId") REFERENCES "product_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_50616b8f91823143e1c2524c034"`);
        await queryRunner.query(`ALTER TABLE "product_option_value_translation" DROP CONSTRAINT "FK_ad5ebfe4748c917d8107eadc2f0"`);
        await queryRunner.query(`DROP TABLE "product_option_value"`);
        await queryRunner.query(`DROP TABLE "product_option_value_translation"`);
    }

}
