import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeYoutubeLinkInNoticeToNull1691575988432 implements MigrationInterface {
  name = 'ChangeYoutubeLinkInNoticeToNull1691575988432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "youtube_link" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "youtube_link" SET NOT NULL`);
  }
}
