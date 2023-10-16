import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRewardEntity1688472660657 implements MigrationInterface {
    name = 'CreateRewardEntity1688472660657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "rpgItemVariantId" uuid, "rpgItemPackageId" uuid, "userId" uuid, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_5cbf52271e66255076deadcf323" FOREIGN KEY ("rpgItemVariantId") REFERENCES "rpg_item_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_d594fc827db3eb6873dada1d5c3" FOREIGN KEY ("rpgItemPackageId") REFERENCES "rpg_item_package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_7b3e48d8a28c1d1422f19c60752" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_7b3e48d8a28c1d1422f19c60752"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_d594fc827db3eb6873dada1d5c3"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_5cbf52271e66255076deadcf323"`);
        await queryRunner.query(`DROP TABLE "reward"`);
    }

}
