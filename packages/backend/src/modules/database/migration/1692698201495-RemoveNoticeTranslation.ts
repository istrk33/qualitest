import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNoticeTranslation1692698201495 implements MigrationInterface {
  name = 'RemoveNoticeTranslation1692698201495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notice_translation"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
