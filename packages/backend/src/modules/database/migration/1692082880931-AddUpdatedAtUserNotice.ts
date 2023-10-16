import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUpdatedAtUserNotice1692082880931 implements MigrationInterface {
  name = 'AddUpdatedAtUserNotice1692082880931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_notice" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_notice" DROP COLUMN "updated_at"`);
  }
}
