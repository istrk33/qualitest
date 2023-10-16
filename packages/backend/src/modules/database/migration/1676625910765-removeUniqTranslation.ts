import { MigrationInterface, QueryRunner } from "typeorm";

export class removeUniqTranslation1676625910765 implements MigrationInterface {
    name = 'removeUniqTranslation1676625910765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "skill_translation" DROP CONSTRAINT "UQ_c8b543e5104452e7e0499e415dd"`);
        await queryRunner.query(`ALTER TABLE "skill_translation" DROP CONSTRAINT "UQ_ef0737377a2d5f38b004755d3fe"`);
        await queryRunner.query(`ALTER TABLE "subject_translation" DROP CONSTRAINT "UQ_bcffbae3a932d9dfd6023a749c2"`);
        await queryRunner.query(`ALTER TABLE "subject_translation" DROP CONSTRAINT "UQ_279c5bdffc40fd9a1a3bff24664"`);
        await queryRunner.query(`ALTER TABLE "subject_category_translation" DROP CONSTRAINT "UQ_d9009fc72c75d58ee6b7437e420"`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_f81beb44b6ad930bea914860601" FOREIGN KEY ("categoryId") REFERENCES "subject_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_f81beb44b6ad930bea914860601"`);
        await queryRunner.query(`ALTER TABLE "subject_category_translation" ADD CONSTRAINT "UQ_d9009fc72c75d58ee6b7437e420" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "subject_translation" ADD CONSTRAINT "UQ_279c5bdffc40fd9a1a3bff24664" UNIQUE ("description")`);
        await queryRunner.query(`ALTER TABLE "subject_translation" ADD CONSTRAINT "UQ_bcffbae3a932d9dfd6023a749c2" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "skill_translation" ADD CONSTRAINT "UQ_ef0737377a2d5f38b004755d3fe" UNIQUE ("description")`);
        await queryRunner.query(`ALTER TABLE "skill_translation" ADD CONSTRAINT "UQ_c8b543e5104452e7e0499e415dd" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "categoryId"`);
    }

}
