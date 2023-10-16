import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserElo1695741541650 implements MigrationInterface {
    name = 'CreateUserElo1695741541650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_elo_variation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eloBeforeVariation" integer NOT NULL, "eloAfterVariation" integer NOT NULL, "date" date NOT NULL, "userEloId" uuid, CONSTRAINT "PK_01c1364e37832093ab22f7ee8a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_elo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentElo" integer NOT NULL, CONSTRAINT "PK_800d040aabf5790e86debdbb5e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "elo_season"`);
        await queryRunner.query(`ALTER TABLE "user_elo_variation" ADD CONSTRAINT "FK_008c9289a8cb88544655f292dbc" FOREIGN KEY ("userEloId") REFERENCES "user_elo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_elo_variation" DROP CONSTRAINT "FK_008c9289a8cb88544655f292dbc"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "elo_season" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "user_elo"`);
        await queryRunner.query(`DROP TABLE "user_elo_variation"`);
    }

}
