import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationUserElo1695989587241 implements MigrationInterface {
    name = 'FixRelationUserElo1695989587241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "user_elo_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_4285ae29cf88c6445f171ca714d" UNIQUE ("user_elo_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4285ae29cf88c6445f171ca714d" FOREIGN KEY ("user_elo_id") REFERENCES "user_elo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4285ae29cf88c6445f171ca714d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_4285ae29cf88c6445f171ca714d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_elo_id"`);
    }

}
