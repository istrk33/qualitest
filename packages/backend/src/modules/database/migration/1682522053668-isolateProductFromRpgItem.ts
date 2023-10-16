import { MigrationInterface, QueryRunner } from "typeorm";

export class IsolateProductFromRpgItem1682522053668 implements MigrationInterface {
    name = 'IsolateProductFromRpgItem1682522053668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4b6ebcc5b2da3b031a13eae919f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_7e2fe82497aa29798b51511ada4"`);
        await queryRunner.query(`ALTER TABLE "order_item" RENAME COLUMN "productVariantId" TO "productId"`);
        await queryRunner.query(`CREATE TABLE "product_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "productId" uuid, "currencyId" uuid, CONSTRAINT "PK_039c4320ccd5ede07440f499268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_discount_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "productId" uuid, "currencyId" uuid, CONSTRAINT "PK_f14cc49384a251f3c01837674d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg_item_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_b935e974894591eb9b27be0c09a" UNIQUE ("title"), CONSTRAINT "PK_a93826246973742768348ba4750" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_category_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_bd53fac901e0f72779bd205b84e" UNIQUE ("title"), CONSTRAINT "PK_65ea0cc103f057c58a23b621db5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "color" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_6ebb47f239dd27184d425ab370f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_rarity_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_c47fa4592617f2567b3fa1b7c47" UNIQUE ("title"), CONSTRAINT "PK_8978941962737a168ea9cf356ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_rarity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "color" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_0e8e453dd1b299abb4789662005" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "image" character varying, "categoryId" uuid, "rarityId" uuid, CONSTRAINT "PK_45b9861a6722af3389941da4dd8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_option_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "display_title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_7ba94b184f37a5aa3262c8580a2" UNIQUE ("title"), CONSTRAINT "PK_4e9a399d4f1d9dff75c7637e2cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "choice_type" character varying NOT NULL, CONSTRAINT "PK_8c686d8c304faa41fed7fb5eb6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_option_value_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_81842c89989707cc3aadf3287b2" UNIQUE ("title"), CONSTRAINT "PK_56b066efa0d658c9fd420f6406e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_option_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "rpgItemOptionId" uuid, CONSTRAINT "PK_ce36a7f2d994888ea0f4f760be5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_variant_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_3ce79a60a92477c3f57c84c55b1" UNIQUE ("title"), CONSTRAINT "PK_bc10dbd53809d6d39204c5dec3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpgItem_variant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "discount_start" TIMESTAMP DEFAULT now(), "discount_end" TIMESTAMP DEFAULT now(), "rpgItemId" uuid, "productId" uuid, CONSTRAINT "REL_05a9b0b5f0ca4e1ff7ac4ba2df" UNIQUE ("productId"), CONSTRAINT "PK_becb1f5f2df6f64abb798150415" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rpg-item_variant_option_value" ("rpgItemVariantId" uuid NOT NULL, "rpgItemOptionValueId" uuid NOT NULL, CONSTRAINT "PK_f153f3e2714c6d7f795847e0959" PRIMARY KEY ("rpgItemVariantId", "rpgItemOptionValueId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d773ffb75abdb1a8b205d39760" ON "rpg-item_variant_option_value" ("rpgItemVariantId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5301ae0a8956685381969b009d" ON "rpg-item_variant_option_value" ("rpgItemOptionValueId") `);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rarityId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "discount_start" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "discount_end" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_55af152bc5cd6f12dd925ece209" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_discount_price" ADD CONSTRAINT "FK_09136afb06287f52aac13052d01" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_discount_price" ADD CONSTRAINT "FK_a05d70484a0d9e231ad38beee26" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg_item_translation" ADD CONSTRAINT "FK_7dc97b01108f217fe990e7fda98" FOREIGN KEY ("translatableId") REFERENCES "rpgItem"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem_category_translation" ADD CONSTRAINT "FK_782b8ba711e1c382341c4f19389" FOREIGN KEY ("translatableId") REFERENCES "rpgItem_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem_rarity_translation" ADD CONSTRAINT "FK_5703436db3a87fadaa65a089b9f" FOREIGN KEY ("translatableId") REFERENCES "rpgItem_rarity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem" ADD CONSTRAINT "FK_c5a9715ceef62849f1bcbd75fdf" FOREIGN KEY ("categoryId") REFERENCES "rpgItem_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem" ADD CONSTRAINT "FK_bf8614c38119dfc5443e96bfde1" FOREIGN KEY ("rarityId") REFERENCES "rpgItem_rarity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem_option_translation" ADD CONSTRAINT "FK_092f28816373b62d8dc2199c5bd" FOREIGN KEY ("translatableId") REFERENCES "rpgItem_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem_option_value_translation" ADD CONSTRAINT "FK_9c7f4374c4bfe3145a29db515d0" FOREIGN KEY ("translatableId") REFERENCES "rpgItem_option_value"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem_option_value" ADD CONSTRAINT "FK_18b7dc3e1b3c3863218ec4fea5d" FOREIGN KEY ("rpgItemOptionId") REFERENCES "rpgItem_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem_variant_translation" ADD CONSTRAINT "FK_bc9a55cdef04f72fb4bb5f611e1" FOREIGN KEY ("translatableId") REFERENCES "rpgItem_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem_variant" ADD CONSTRAINT "FK_a86468f905185b0c3bf81786647" FOREIGN KEY ("rpgItemId") REFERENCES "rpgItem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpgItem_variant" ADD CONSTRAINT "FK_05a9b0b5f0ca4e1ff7ac4ba2df6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" ADD CONSTRAINT "FK_d773ffb75abdb1a8b205d397600" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpgItem_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" ADD CONSTRAINT "FK_5301ae0a8956685381969b009d1" FOREIGN KEY ("rpgItemOptionValueId") REFERENCES "rpgItem_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" DROP CONSTRAINT "FK_5301ae0a8956685381969b009d1"`);
        await queryRunner.query(`ALTER TABLE "rpg-item_variant_option_value" DROP CONSTRAINT "FK_d773ffb75abdb1a8b205d397600"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "rpgItem_variant" DROP CONSTRAINT "FK_05a9b0b5f0ca4e1ff7ac4ba2df6"`);
        await queryRunner.query(`ALTER TABLE "rpgItem_variant" DROP CONSTRAINT "FK_a86468f905185b0c3bf81786647"`);
        await queryRunner.query(`ALTER TABLE "rpgItem_variant_translation" DROP CONSTRAINT "FK_bc9a55cdef04f72fb4bb5f611e1"`);
        await queryRunner.query(`ALTER TABLE "rpgItem_option_value" DROP CONSTRAINT "FK_18b7dc3e1b3c3863218ec4fea5d"`);
        await queryRunner.query(`ALTER TABLE "rpgItem_option_value_translation" DROP CONSTRAINT "FK_9c7f4374c4bfe3145a29db515d0"`);
        await queryRunner.query(`ALTER TABLE "rpgItem_option_translation" DROP CONSTRAINT "FK_092f28816373b62d8dc2199c5bd"`);
        await queryRunner.query(`ALTER TABLE "rpgItem" DROP CONSTRAINT "FK_bf8614c38119dfc5443e96bfde1"`);
        await queryRunner.query(`ALTER TABLE "rpgItem" DROP CONSTRAINT "FK_c5a9715ceef62849f1bcbd75fdf"`);
        await queryRunner.query(`ALTER TABLE "rpgItem_rarity_translation" DROP CONSTRAINT "FK_5703436db3a87fadaa65a089b9f"`);
        await queryRunner.query(`ALTER TABLE "rpgItem_category_translation" DROP CONSTRAINT "FK_782b8ba711e1c382341c4f19389"`);
        await queryRunner.query(`ALTER TABLE "rpg_item_translation" DROP CONSTRAINT "FK_7dc97b01108f217fe990e7fda98"`);
        await queryRunner.query(`ALTER TABLE "product_discount_price" DROP CONSTRAINT "FK_a05d70484a0d9e231ad38beee26"`);
        await queryRunner.query(`ALTER TABLE "product_discount_price" DROP CONSTRAINT "FK_09136afb06287f52aac13052d01"`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_55af152bc5cd6f12dd925ece209"`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "discount_end"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "discount_start"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "rarityId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5301ae0a8956685381969b009d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d773ffb75abdb1a8b205d39760"`);
        await queryRunner.query(`DROP TABLE "rpg-item_variant_option_value"`);
        await queryRunner.query(`DROP TABLE "rpgItem_variant"`);
        await queryRunner.query(`DROP TABLE "rpgItem_variant_translation"`);
        await queryRunner.query(`DROP TABLE "rpgItem_option_value"`);
        await queryRunner.query(`DROP TABLE "rpgItem_option_value_translation"`);
        await queryRunner.query(`DROP TABLE "rpgItem_option"`);
        await queryRunner.query(`DROP TABLE "rpgItem_option_translation"`);
        await queryRunner.query(`DROP TABLE "rpgItem"`);
        await queryRunner.query(`DROP TABLE "rpgItem_rarity"`);
        await queryRunner.query(`DROP TABLE "rpgItem_rarity_translation"`);
        await queryRunner.query(`DROP TABLE "rpgItem_category"`);
        await queryRunner.query(`DROP TABLE "rpgItem_category_translation"`);
        await queryRunner.query(`DROP TABLE "rpg_item_translation"`);
        await queryRunner.query(`DROP TABLE "product_discount_price"`);
        await queryRunner.query(`DROP TABLE "product_price"`);
        await queryRunner.query(`ALTER TABLE "order_item" RENAME COLUMN "productId" TO "productVariantId"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_7e2fe82497aa29798b51511ada4" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4b6ebcc5b2da3b031a13eae919f" FOREIGN KEY ("rarityId") REFERENCES "product_rarity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
