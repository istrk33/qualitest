import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserDetails1667813548790 implements MigrationInterface {
    name = 'addUserDetails1667813548790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "birth_place" character varying NOT NULL, "birth_date" character varying NOT NULL, "entry_date" TIMESTAMP NOT NULL, "address_primary" character varying NOT NULL, "address_secondary" character varying NOT NULL, "city" character varying NOT NULL, "zipcode" character varying NOT NULL, "country" character varying NOT NULL, "discord_tag" character varying NOT NULL, "pseudo" character varying NOT NULL, "twitter" character varying NOT NULL, "linkedin" character varying NOT NULL, CONSTRAINT "PK_9fc134ca20766e165ad650ee740" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_detail"`);
    }

}
