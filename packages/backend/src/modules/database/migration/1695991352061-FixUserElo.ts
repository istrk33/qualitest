import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserElo1695991352061 implements MigrationInterface {
    name = 'FixUserElo1695991352061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_elo_variation" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "user_elo_variation" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_elo_variation" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "user_elo_variation" ADD "date" date NOT NULL`);
    }

}
