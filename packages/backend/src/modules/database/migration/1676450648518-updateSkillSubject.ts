import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateSkillSubject1676450648518 implements MigrationInterface {
  name = 'updateSkillSubject1676450648518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject_category_translation" DROP CONSTRAINT "UQ_1c62c7ec468a16018c54871bac3"`);
    await queryRunner.query(`ALTER TABLE "subject_category_translation" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "skill" ADD "replacingId" uuid`);
    await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "obsoleted_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "replace_at" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "skill" ADD CONSTRAINT "FK_c04904293a1f7206170386c242d" FOREIGN KEY ("replacingId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_c04904293a1f7206170386c242d"`);
    await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "replace_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "obsoleted_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "replacingId"`);
    await queryRunner.query(`ALTER TABLE "subject_category_translation" ADD "description" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "subject_category_translation" ADD CONSTRAINT "UQ_1c62c7ec468a16018c54871bac3" UNIQUE ("description")`,
    );
  }
}
