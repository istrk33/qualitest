import { MigrationInterface, QueryRunner } from "typeorm";

export class createCurrencyAndUserWallet1681209809962 implements MigrationInterface {
    name = 'createCurrencyAndUserWallet1681209809962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "image" character varying NOT NULL, "userId" uuid, "currencyId" uuid, CONSTRAINT "PK_b453ec3d9d579f6b9699be98beb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_wallet" ADD CONSTRAINT "FK_f470cbcba8c6dbdaf32ac0d4267" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_wallet" ADD CONSTRAINT "FK_a4de9258bb189a50d3f99b0b186" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_wallet" DROP CONSTRAINT "FK_a4de9258bb189a50d3f99b0b186"`);
        await queryRunner.query(`ALTER TABLE "user_wallet" DROP CONSTRAINT "FK_f470cbcba8c6dbdaf32ac0d4267"`);
        await queryRunner.query(`DROP TABLE "user_wallet"`);
        await queryRunner.query(`DROP TABLE "currency"`);
    }

}
