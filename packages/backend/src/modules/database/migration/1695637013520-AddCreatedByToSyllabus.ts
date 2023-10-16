import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedByToSyllabus1695637013520 implements MigrationInterface {
    name = 'AddCreatedByToSyllabus1695637013520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabus" ADD "createdById" uuid`);
        await queryRunner.query(`ALTER TABLE "syllabus" ADD "updatedById" uuid`);
        await queryRunner.query(`ALTER TABLE "syllabus" ADD CONSTRAINT "FK_f552ce211a9074bdd8148055e32" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabus" ADD CONSTRAINT "FK_7eb20746edeb35540d11425ccf2" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabus" DROP CONSTRAINT "FK_7eb20746edeb35540d11425ccf2"`);
        await queryRunner.query(`ALTER TABLE "syllabus" DROP CONSTRAINT "FK_f552ce211a9074bdd8148055e32"`);
        await queryRunner.query(`ALTER TABLE "syllabus" DROP COLUMN "updatedById"`);
        await queryRunner.query(`ALTER TABLE "syllabus" DROP COLUMN "createdById"`);
    }

}
