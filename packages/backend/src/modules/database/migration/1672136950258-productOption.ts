import { MigrationInterface, QueryRunner } from "typeorm";

export class productOption1672136950258 implements MigrationInterface {
    name = 'productOption1672136950258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_option_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "display_title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_e5847e6872e6a362689c3a54e46" UNIQUE ("title"), CONSTRAINT "PK_69c79a84baabcad3c7328576ac0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "choice_type" character varying NOT NULL, CONSTRAINT "PK_4cf3c467e9bc764bdd32c4cd938" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_option_translation" ADD CONSTRAINT "FK_bdbc4e61e43faa27d8cadbd0ce3" FOREIGN KEY ("translatableId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_option_translation" DROP CONSTRAINT "FK_bdbc4e61e43faa27d8cadbd0ce3"`);
        await queryRunner.query(`DROP TABLE "product_option"`);
        await queryRunner.query(`DROP TABLE "product_option_translation"`);
    }

}
