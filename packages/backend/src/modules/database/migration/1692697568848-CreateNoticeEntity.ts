import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNoticeEntity1692697568848 implements MigrationInterface {
    name = 'CreateNoticeEntity1692697568848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice_translation" DROP COLUMN "btn_text"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "publication_date"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "skip_delay"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "head_image"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "background_image"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "youtube_link"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "redirectLink" character varying`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "has_been_seen" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "notice" ADD CONSTRAINT "FK_d0d4b8dac89a99634b7e1fde052" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP CONSTRAINT "FK_d0d4b8dac89a99634b7e1fde052"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "has_been_seen"`);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "redirectLink"`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "youtube_link" character varying`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "background_image" character varying`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "head_image" character varying`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "skip_delay" integer NOT NULL DEFAULT '5'`);
        await queryRunner.query(`ALTER TABLE "notice" ADD "publication_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notice_translation" ADD "btn_text" character varying NOT NULL`);
    }

}
