import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserInDiaryMessage1694429049501 implements MigrationInterface {
    name = 'FixUserInDiaryMessage1694429049501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_diary_messages" ("user_id" uuid NOT NULL, "diary_message_id" uuid NOT NULL, CONSTRAINT "PK_2e6814adf873550ebceef87b90e" PRIMARY KEY ("user_id", "diary_message_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_283b5977611360c4283002be53" ON "users_diary_messages" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a98a053c104c77b4d814d5578c" ON "users_diary_messages" ("diary_message_id") `);
        await queryRunner.query(`ALTER TABLE "diaryMessage" ADD "is_private" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "diaryMessage" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" ADD CONSTRAINT "FK_283b5977611360c4283002be539" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" ADD CONSTRAINT "FK_a98a053c104c77b4d814d5578c5" FOREIGN KEY ("diary_message_id") REFERENCES "diaryMessage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_diary_messages" DROP CONSTRAINT "FK_a98a053c104c77b4d814d5578c5"`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" DROP CONSTRAINT "FK_283b5977611360c4283002be539"`);
        await queryRunner.query(`ALTER TABLE "diaryMessage" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "diaryMessage" DROP COLUMN "is_private"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a98a053c104c77b4d814d5578c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_283b5977611360c4283002be53"`);
        await queryRunner.query(`DROP TABLE "users_diary_messages"`);
    }

}
