import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEloSeasonToUser1695718436988 implements MigrationInterface {
    name = 'AddEloSeasonToUser1695718436988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "elo_season" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "elo_season"`);
    }

}
