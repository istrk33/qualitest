import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameRelationColumnsUserNotice1691749260197 implements MigrationInterface {
  name = 'RenameRelationColumnsUserNotice1691749260197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_notice" DROP CONSTRAINT "FK_210a3a2884abd3a2b63f1899977"`);
    await queryRunner.query(`ALTER TABLE "user_notice" DROP CONSTRAINT "FK_f8e41a3637b784107fc82a431b5"`);
    await queryRunner.query(`ALTER TABLE "user_notice" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "user_notice" DROP COLUMN "noticeId"`);
    await queryRunner.query(`ALTER TABLE "user_notice" ADD "user_id" uuid`);
    await queryRunner.query(`ALTER TABLE "user_notice" ADD "notice_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user_notice" ADD CONSTRAINT "FK_5eb2b023d97787c4b3c104d072f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notice" ADD CONSTRAINT "FK_1673e151c85d9998179f2056ac4" FOREIGN KEY ("notice_id") REFERENCES "notice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_notice" DROP CONSTRAINT "FK_1673e151c85d9998179f2056ac4"`);
    await queryRunner.query(`ALTER TABLE "user_notice" DROP CONSTRAINT "FK_5eb2b023d97787c4b3c104d072f"`);
    await queryRunner.query(`ALTER TABLE "user_notice" DROP COLUMN "notice_id"`);
    await queryRunner.query(`ALTER TABLE "user_notice" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "user_notice" ADD "noticeId" uuid`);
    await queryRunner.query(`ALTER TABLE "user_notice" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user_notice" ADD CONSTRAINT "FK_f8e41a3637b784107fc82a431b5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notice" ADD CONSTRAINT "FK_210a3a2884abd3a2b63f1899977" FOREIGN KEY ("noticeId") REFERENCES "notice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
