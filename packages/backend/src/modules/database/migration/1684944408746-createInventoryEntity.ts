import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventoryEntity1684944408746 implements MigrationInterface {
    name = 'CreateInventoryEntity1684944408746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "rpgItemVariantId" uuid, "userId" uuid, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_5c51599b795de53ac2813adaa54" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpg_item_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_fe4917e809e078929fe517ab762" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_fe4917e809e078929fe517ab762"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_5c51599b795de53ac2813adaa54"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
    }

}
