import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCascadeSubject1695387668705 implements MigrationInterface {
    name = 'ChangeCascadeSubject1695387668705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_accreditation" DROP CONSTRAINT "FK_9ee06e84aec96ccee9defc2a7bf"`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" ADD CONSTRAINT "FK_9ee06e84aec96ccee9defc2a7bf" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_accreditation" DROP CONSTRAINT "FK_9ee06e84aec96ccee9defc2a7bf"`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" ADD CONSTRAINT "FK_9ee06e84aec96ccee9defc2a7bf" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
