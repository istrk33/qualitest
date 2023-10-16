import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserGamesRelationTable1685954432452 implements MigrationInterface {
    name = 'FixUserGamesRelationTable1685954432452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_32e6fd6c60456d11f4fd948d4de"`);
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_5709157a2bef3e8657f721c4734"`);
        await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "obsoleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "replaced_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_32e6fd6c60456d11f4fd948d4de" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_5709157a2bef3e8657f721c4734" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_5709157a2bef3e8657f721c4734"`);
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_32e6fd6c60456d11f4fd948d4de"`);
        await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "replaced_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "obsoleted_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_5709157a2bef3e8657f721c4734" FOREIGN KEY ("game_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_32e6fd6c60456d11f4fd948d4de" FOREIGN KEY ("user_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
