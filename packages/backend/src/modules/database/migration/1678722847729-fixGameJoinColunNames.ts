import { MigrationInterface, QueryRunner } from "typeorm";

export class fixGameJoinColunNames1678722847729 implements MigrationInterface {
    name = 'fixGameJoinColunNames1678722847729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_games" ("game_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_b253cf970dc44a26d2e98ea17c9" PRIMARY KEY ("game_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5709157a2bef3e8657f721c473" ON "users_games" ("game_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_32e6fd6c60456d11f4fd948d4d" ON "users_games" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_5709157a2bef3e8657f721c4734" FOREIGN KEY ("game_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_32e6fd6c60456d11f4fd948d4de" FOREIGN KEY ("user_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_32e6fd6c60456d11f4fd948d4de"`);
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_5709157a2bef3e8657f721c4734"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32e6fd6c60456d11f4fd948d4d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5709157a2bef3e8657f721c473"`);
        await queryRunner.query(`DROP TABLE "users_games"`);
    }

}
