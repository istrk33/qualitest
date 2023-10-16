import { MigrationInterface, QueryRunner } from "typeorm";

export class missionQuestAddElo1684229497430 implements MigrationInterface {
    name = 'missionQuestAddElo1684229497430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" ADD "elo" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "quest" ADD "estimatedDuration" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "mission" ADD "elo" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission" DROP COLUMN "elo"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "estimatedDuration"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "elo"`);
    }

}
