import { MigrationInterface, QueryRunner } from 'typeorm';

export class tagAndUserRelation1666707714954 implements MigrationInterface {
  name = 'tagAndUserRelation1666707714954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "tagId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1bbf4310525429accff9df0787e" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1bbf4310525429accff9df0787e"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tagId"`);
  }
}
