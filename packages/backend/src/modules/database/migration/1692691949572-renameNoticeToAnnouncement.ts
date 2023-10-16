import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameNoticeToAnnouncement1692691949572 implements MigrationInterface {
    name = 'RenameNoticeToAnnouncement1692691949572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announcement_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "btn_text" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_1cb3ff50ce7e41d38c7e0e79e7d" UNIQUE ("title"), CONSTRAINT "PK_feeb55b34ae5b157aa9f7e79220" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "publication_date" TIMESTAMP NOT NULL, "head_image" character varying, "background_image" character varying, "youtube_link" character varying, "skip_delay" integer NOT NULL DEFAULT '5', "slug" character varying NOT NULL, CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_announcement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "has_been_seen" boolean NOT NULL DEFAULT false, "user_id" uuid, "announcement_id" uuid, CONSTRAINT "PK_c533978c7bbe198d68fb7d660fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announcement_translation" ADD CONSTRAINT "FK_97f5bb275ecb1efc6446baec307" FOREIGN KEY ("translatableId") REFERENCES "announcement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_announcement" ADD CONSTRAINT "FK_4497e1edfa98e2b4bfe31c68435" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_announcement" ADD CONSTRAINT "FK_ca1b923fdca3b76e31064b275f9" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_announcement" DROP CONSTRAINT "FK_ca1b923fdca3b76e31064b275f9"`);
        await queryRunner.query(`ALTER TABLE "user_announcement" DROP CONSTRAINT "FK_4497e1edfa98e2b4bfe31c68435"`);
        await queryRunner.query(`ALTER TABLE "announcement_translation" DROP CONSTRAINT "FK_97f5bb275ecb1efc6446baec307"`);
        await queryRunner.query(`DROP TABLE "user_announcement"`);
        await queryRunner.query(`DROP TABLE "announcement"`);
        await queryRunner.query(`DROP TABLE "announcement_translation"`);
    }

}
