import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChallengeEntities1689324039228 implements MigrationInterface {
    name = 'CreateChallengeEntities1689324039228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reward_template_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_b467b983185acc42eebf2ec9b47" UNIQUE ("title"), CONSTRAINT "PK_272a90e9c0177398937f756f04f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reward_template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "rpgItemVariantId" uuid, "rpgItemPackageId" uuid, CONSTRAINT "PK_787bcbb3b446244019f3663f2ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "challenge_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_e10d74d65ca3cd362c233b733af" UNIQUE ("title"), CONSTRAINT "PK_13a854dab8e6715f60e332bdea7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "challenge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying, "isPublished" boolean NOT NULL, "publishedFrom" TIMESTAMP NOT NULL, "publishedUntil" TIMESTAMP NOT NULL, "rpgItemVariantId" uuid, "rpgItemPackageId" uuid, "rewardTemplateId" uuid, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_challenge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying, "reviewed_at" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "userId" uuid, "challengeId" uuid, "reviewerId" uuid, CONSTRAINT "PK_f17ac7d57d22c067e61d6b64aad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "rewardTemplateId" uuid`);
        await queryRunner.query(`ALTER TABLE "reward_template_translation" ADD CONSTRAINT "FK_e6f8a9e5403af98056c122daaa6" FOREIGN KEY ("translatableId") REFERENCES "reward_template"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward_template" ADD CONSTRAINT "FK_c33150c42350e5be38f20989c9d" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpg_item_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward_template" ADD CONSTRAINT "FK_3e8f72f626f5b0a004ac75afba4" FOREIGN KEY ("rpgItemPackageId") REFERENCES "rpg_item_package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_18814348ae1693413c7de6bab86" FOREIGN KEY ("rewardTemplateId") REFERENCES "reward_template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge_translation" ADD CONSTRAINT "FK_48bbd479a51aa110c924d2179d8" FOREIGN KEY ("translatableId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_eba22003cab9ffde57711fa938c" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpg_item_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_885fd9497710f8d3e846d0934b3" FOREIGN KEY ("rpgItemPackageId") REFERENCES "rpg_item_package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_184daf9b3edfc832cf9db012bc3" FOREIGN KEY ("rewardTemplateId") REFERENCES "reward_template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_challenge" ADD CONSTRAINT "FK_2a670b2efe9436c88cef7f15699" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_challenge" ADD CONSTRAINT "FK_ca62482b3c020cd5055eaabf4cf" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_challenge" ADD CONSTRAINT "FK_e2f4a53b8dcea67679c82144b9c" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_challenge" DROP CONSTRAINT "FK_e2f4a53b8dcea67679c82144b9c"`);
        await queryRunner.query(`ALTER TABLE "user_challenge" DROP CONSTRAINT "FK_ca62482b3c020cd5055eaabf4cf"`);
        await queryRunner.query(`ALTER TABLE "user_challenge" DROP CONSTRAINT "FK_2a670b2efe9436c88cef7f15699"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_184daf9b3edfc832cf9db012bc3"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_885fd9497710f8d3e846d0934b3"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_eba22003cab9ffde57711fa938c"`);
        await queryRunner.query(`ALTER TABLE "challenge_translation" DROP CONSTRAINT "FK_48bbd479a51aa110c924d2179d8"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_18814348ae1693413c7de6bab86"`);
        await queryRunner.query(`ALTER TABLE "reward_template" DROP CONSTRAINT "FK_3e8f72f626f5b0a004ac75afba4"`);
        await queryRunner.query(`ALTER TABLE "reward_template" DROP CONSTRAINT "FK_c33150c42350e5be38f20989c9d"`);
        await queryRunner.query(`ALTER TABLE "reward_template_translation" DROP CONSTRAINT "FK_e6f8a9e5403af98056c122daaa6"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "rewardTemplateId"`);
        await queryRunner.query(`DROP TABLE "user_challenge"`);
        await queryRunner.query(`DROP TABLE "challenge"`);
        await queryRunner.query(`DROP TABLE "challenge_translation"`);
        await queryRunner.query(`DROP TABLE "reward_template"`);
        await queryRunner.query(`DROP TABLE "reward_template_translation"`);
    }

}
