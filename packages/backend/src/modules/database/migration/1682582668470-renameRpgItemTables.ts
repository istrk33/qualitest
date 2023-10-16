import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameRpgItemTables1682582668470 implements MigrationInterface {
    name = 'RenameRpgItemTables1682582668470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item_translation" DROP CONSTRAINT "FK_7dc97b01108f217fe990e7fda98"`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" DROP CONSTRAINT "FK_5301ae0a8956685381969b009d1"`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" DROP CONSTRAINT "FK_d773ffb75abdb1a8b205d397600"`);
        await queryRunner.query(`CREATE TABLE "rpg_item_category_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_e7fc3d01c6c275b3efaea1946e8" UNIQUE ("title"), CONSTRAINT "PK_e05bf1148be6a1b71dafd7ed549" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "color" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_d4c1e8c4adeb74372aa08e247fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_rarity_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_9761dbca1d7d99bd1436acb3d85" UNIQUE ("title"), CONSTRAINT "PK_531d3076ed23c16574a373e00e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_rarity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "color" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_4e8c2d6897dc58e44b385597634" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "image" character varying, "categoryId" uuid, "rarityId" uuid, CONSTRAINT "PK_32f4a5194cc33d4b6cf348db574" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_option_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "display_title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_99f93b25db93dae4ba8f8a623c3" UNIQUE ("title"), CONSTRAINT "PK_8037a904d02680c1f584c38b570" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "choice_type" character varying NOT NULL, CONSTRAINT "PK_1c58abec72cf7c55f85ca490f54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_option_value_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_403449f5e9d186a001c5dd84bf0" UNIQUE ("title"), CONSTRAINT "PK_bc656aaa67fa27923741be7f42d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_option_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "rpgItemOptionId" uuid, CONSTRAINT "PK_34d640b5d2feadd1ecaa3d87b33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_variant_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_de5cb463ae651f37ac7c70f69fa" UNIQUE ("title"), CONSTRAINT "PK_72c4dd950626b521cca95429b00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_variant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "discount_start" TIMESTAMP DEFAULT now(), "discount_end" TIMESTAMP DEFAULT now(), "rpgItemId" uuid, "productId" uuid, CONSTRAINT "REL_c33cab97c45fd9f58806a8434a" UNIQUE ("productId"), CONSTRAINT "PK_1cfae60c41a57ffefbe5b751ab8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rpg_item_translation" ADD CONSTRAINT "FK_7dc97b01108f217fe990e7fda98" FOREIGN KEY ("translatableId") REFERENCES "rpg_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_category_translation" ADD CONSTRAINT "FK_86dd2f09e6f79ca37f81b2e3817" FOREIGN KEY ("translatableId") REFERENCES "rpg_item_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_rarity_translation" ADD CONSTRAINT "FK_7d0e7ff18be0686b45924928d5e" FOREIGN KEY ("translatableId") REFERENCES "rpg_item_rarity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item" ADD CONSTRAINT "FK_5a75a6b936dde4df43f591c494b" FOREIGN KEY ("categoryId") REFERENCES "rpg_item_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item" ADD CONSTRAINT "FK_4b2018e387ab0fefa24aff38272" FOREIGN KEY ("rarityId") REFERENCES "rpg_item_rarity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_option_translation" ADD CONSTRAINT "FK_8bd2db06c4e9a4cea46e5305e8f" FOREIGN KEY ("translatableId") REFERENCES "rpg_item_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_option_value_translation" ADD CONSTRAINT "FK_27e16c524f8600a2d466b495341" FOREIGN KEY ("translatableId") REFERENCES "rpg_item_option_value"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_option_value" ADD CONSTRAINT "FK_9c22564004db678479a2f675275" FOREIGN KEY ("rpgItemOptionId") REFERENCES "rpg_item_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_translation" ADD CONSTRAINT "FK_b0d0261429a5caa86a95f77198d" FOREIGN KEY ("translatableId") REFERENCES "rpg_item_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD CONSTRAINT "FK_4912204fa4794df9f919e716d02" FOREIGN KEY ("rpgItemId") REFERENCES "rpg_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" ADD CONSTRAINT "FK_c33cab97c45fd9f58806a8434a8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" ADD CONSTRAINT "FK_d773ffb75abdb1a8b205d397600" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpg_item_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" ADD CONSTRAINT "FK_5301ae0a8956685381969b009d1" FOREIGN KEY ("rpgItemOptionValueId") REFERENCES "rpg_item_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" DROP CONSTRAINT "FK_5301ae0a8956685381969b009d1"`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" DROP CONSTRAINT "FK_d773ffb75abdb1a8b205d397600"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP CONSTRAINT "FK_c33cab97c45fd9f58806a8434a8"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant" DROP CONSTRAINT "FK_4912204fa4794df9f919e716d02"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_variant_translation" DROP CONSTRAINT "FK_b0d0261429a5caa86a95f77198d"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_option_value" DROP CONSTRAINT "FK_9c22564004db678479a2f675275"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_option_value_translation" DROP CONSTRAINT "FK_27e16c524f8600a2d466b495341"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_option_translation" DROP CONSTRAINT "FK_8bd2db06c4e9a4cea46e5305e8f"`);
        await queryRunner.query(`ALTER TABLE "rpg_item" DROP CONSTRAINT "FK_4b2018e387ab0fefa24aff38272"`);
        await queryRunner.query(`ALTER TABLE "rpg_item" DROP CONSTRAINT "FK_5a75a6b936dde4df43f591c494b"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_rarity_translation" DROP CONSTRAINT "FK_7d0e7ff18be0686b45924928d5e"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_category_translation" DROP CONSTRAINT "FK_86dd2f09e6f79ca37f81b2e3817"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_translation" DROP CONSTRAINT "FK_7dc97b01108f217fe990e7fda98"`);
        await queryRunner.query(`DROP TABLE "rpg_item_variant"`);
        await queryRunner.query(`DROP TABLE "rpg_item_variant_translation"`);
        await queryRunner.query(`DROP TABLE "rpg_item_option_value"`);
        await queryRunner.query(`DROP TABLE "rpg_item_option_value_translation"`);
        await queryRunner.query(`DROP TABLE "rpg_item_option"`);
        await queryRunner.query(`DROP TABLE "rpg_item_option_translation"`);
        await queryRunner.query(`DROP TABLE "rpg_item"`);
        await queryRunner.query(`DROP TABLE "rpg_item_rarity"`);
        await queryRunner.query(`DROP TABLE "rpg_item_rarity_translation"`);
        await queryRunner.query(`DROP TABLE "rpg_item_category"`);
        await queryRunner.query(`DROP TABLE "rpg_item_category_translation"`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" ADD CONSTRAINT "FK_d773ffb75abdb1a8b205d397600" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpgItem_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" ADD CONSTRAINT "FK_5301ae0a8956685381969b009d1" FOREIGN KEY ("rpgItemOptionValueId") REFERENCES "rpgItem_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_translation" ADD CONSTRAINT "FK_7dc97b01108f217fe990e7fda98" FOREIGN KEY ("translatableId") REFERENCES "rpgItem"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
