import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDiaryMessageRecipentsFk1694434452969 implements MigrationInterface {
    name = 'FixDiaryMessageRecipentsFk1694434452969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_diary_messages" DROP CONSTRAINT "FK_a98a053c104c77b4d814d5578c5"`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" DROP CONSTRAINT "FK_283b5977611360c4283002be539"`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" ADD CONSTRAINT "FK_283b5977611360c4283002be539" FOREIGN KEY ("user_id") REFERENCES "diaryMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" ADD CONSTRAINT "FK_a98a053c104c77b4d814d5578c5" FOREIGN KEY ("diary_message_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_diary_messages" DROP CONSTRAINT "FK_a98a053c104c77b4d814d5578c5"`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" DROP CONSTRAINT "FK_283b5977611360c4283002be539"`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" ADD CONSTRAINT "FK_283b5977611360c4283002be539" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" ADD CONSTRAINT "FK_a98a053c104c77b4d814d5578c5" FOREIGN KEY ("diary_message_id") REFERENCES "diaryMessage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
