import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTagBaseEntity1666703048605 implements MigrationInterface {
  name = 'CreateTagBaseEntity1666703048605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "parentTagId" uuid, CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531" UNIQUE ("title"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'INACTIVE'`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isVerified" SET DEFAULT false`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_e7ba4974cfa176a3291b1d06972" FOREIGN KEY ("parentTagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_e7ba4974cfa176a3291b1d06972"`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isVerified" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`DROP TABLE "tag"`);
  }
}
