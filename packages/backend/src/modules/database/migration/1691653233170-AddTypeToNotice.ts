import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTypeToNotice1691653233170 implements MigrationInterface {
  name = 'AddTypeToNotice1691653233170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notice" ADD "type" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "type"`);
  }
}
