import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDeleteMentoringSlotCascade1697116150383 implements MigrationInterface {
    name = 'FixDeleteMentoringSlotCascade1697116150383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject" DROP CONSTRAINT "FK_d7e9f6a43e9f58950e406f2e74a"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject" ADD CONSTRAINT "FK_d7e9f6a43e9f58950e406f2e74a" FOREIGN KEY ("mentoringSlotId") REFERENCES "mentoring_slot"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject" DROP CONSTRAINT "FK_d7e9f6a43e9f58950e406f2e74a"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject" ADD CONSTRAINT "FK_d7e9f6a43e9f58950e406f2e74a" FOREIGN KEY ("mentoringSlotId") REFERENCES "mentoring_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
