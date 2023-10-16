import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSeasonToEloVariation1695911976036 implements MigrationInterface {
    name = 'AddSeasonToEloVariation1695911976036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_elo_variation" ADD "seasonId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_elo_variation" ADD CONSTRAINT "FK_41d64c43cfedc6fd17af3272d91" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_elo_variation" DROP CONSTRAINT "FK_41d64c43cfedc6fd17af3272d91"`);
        await queryRunner.query(`ALTER TABLE "user_elo_variation" DROP COLUMN "seasonId"`);
    }

}
