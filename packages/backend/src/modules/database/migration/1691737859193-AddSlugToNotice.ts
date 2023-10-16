import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlugToNotice1691737859193 implements MigrationInterface {
  name = 'AddSlugToNotice1691737859193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notice" ADD "slug" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "slug"`);
  }
}
