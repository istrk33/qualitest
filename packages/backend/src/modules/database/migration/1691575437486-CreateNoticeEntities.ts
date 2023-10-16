import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNoticeEntities1691575437486 implements MigrationInterface {
  name = 'CreateNoticeEntities1691575437486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notice_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "btn_text" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_dda6f82a1abb22907f14b6bb693" UNIQUE ("title"), CONSTRAINT "PK_36285690f6ca4eb7cb3e1e7690a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "publication_date" TIMESTAMP NOT NULL, "head_image" character varying, "background_image" character varying, "youtube_link" character varying NOT NULL, "skip_delay" integer NOT NULL DEFAULT '5', CONSTRAINT "PK_705062b14410ff1a04998f86d72" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_notice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "has_been_seen" boolean NOT NULL DEFAULT false, "userId" uuid, "noticeId" uuid, CONSTRAINT "PK_1fa9968b4608730dc7f3543b2c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "notice_translation" ADD CONSTRAINT "FK_d7461c722754de63aac6400cdd4" FOREIGN KEY ("translatableId") REFERENCES "notice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notice" ADD CONSTRAINT "FK_f8e41a3637b784107fc82a431b5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notice" ADD CONSTRAINT "FK_210a3a2884abd3a2b63f1899977" FOREIGN KEY ("noticeId") REFERENCES "notice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_notice" DROP CONSTRAINT "FK_210a3a2884abd3a2b63f1899977"`);
    await queryRunner.query(`ALTER TABLE "user_notice" DROP CONSTRAINT "FK_f8e41a3637b784107fc82a431b5"`);
    await queryRunner.query(`ALTER TABLE "notice_translation" DROP CONSTRAINT "FK_d7461c722754de63aac6400cdd4"`);
    await queryRunner.query(`DROP TABLE "user_notice"`);
    await queryRunner.query(`DROP TABLE "notice"`);
    await queryRunner.query(`DROP TABLE "notice_translation"`);
  }
}
