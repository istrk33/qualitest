import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRpgTransactionModuleEntity1683636729566 implements MigrationInterface {
    name = 'CreateRpgTransactionModuleEntity1683636729566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rpg_transaction_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "movement" json NOT NULL, CONSTRAINT "PK_17f2639ca519f35d184ad083955" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rpg_transaction_history"`);
    }

}
