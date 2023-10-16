import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameDiaryMessageTable1694596543715 implements MigrationInterface {
    name = 'RenameDiaryMessageTable1694596543715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diary_message_translation" DROP CONSTRAINT "FK_38eb6a883fa6762ab5fab908074"`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" DROP CONSTRAINT "FK_283b5977611360c4283002be539"`);
        await queryRunner.query(`CREATE TABLE "diary_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "is_private" boolean NOT NULL, "type" character varying NOT NULL, "createdById" uuid NOT NULL, CONSTRAINT "PK_5d2ae5b4b6bdd0838198939865f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "diary_message_translation" ADD CONSTRAINT "FK_38eb6a883fa6762ab5fab908074" FOREIGN KEY ("translatableId") REFERENCES "diary_message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diary_message" ADD CONSTRAINT "FK_a19f8586636548c2660d0379ff4" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" ADD CONSTRAINT "FK_283b5977611360c4283002be539" FOREIGN KEY ("user_id") REFERENCES "diary_message"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_diary_messages" DROP CONSTRAINT "FK_283b5977611360c4283002be539"`);
        await queryRunner.query(`ALTER TABLE "diary_message" DROP CONSTRAINT "FK_a19f8586636548c2660d0379ff4"`);
        await queryRunner.query(`ALTER TABLE "diary_message_translation" DROP CONSTRAINT "FK_38eb6a883fa6762ab5fab908074"`);
        await queryRunner.query(`DROP TABLE "diary_message"`);
        await queryRunner.query(`ALTER TABLE "users_diary_messages" ADD CONSTRAINT "FK_283b5977611360c4283002be539" FOREIGN KEY ("user_id") REFERENCES "diaryMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "diary_message_translation" ADD CONSTRAINT "FK_38eb6a883fa6762ab5fab908074" FOREIGN KEY ("translatableId") REFERENCES "diaryMessage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
