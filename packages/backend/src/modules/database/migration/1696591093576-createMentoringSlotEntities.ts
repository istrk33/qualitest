import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMentoringSlotEntities1696591093576 implements MigrationInterface {
    name = 'CreateMentoringSlotEntities1696591093576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mentoring_slot_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "downgrade_reason" character varying, "translatableId" uuid, CONSTRAINT "PK_f910e692864a0bd52962c9f5a1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mentoring_slot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "slug" character varying NOT NULL, "status" character varying NOT NULL, "was_missed_by_mentor" boolean NOT NULL, "is_downgraded" boolean NOT NULL, "createdById" uuid NOT NULL, "updatedById" uuid NOT NULL, "mentorId" uuid NOT NULL, "subjectCategoryId" uuid NOT NULL, CONSTRAINT "PK_c7cbee4b6bf6baa8f519617859f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mentoring_slot_subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subjectId" uuid, "mentoringSlotId" uuid, CONSTRAINT "PK_14a4efd2d8044a179065968ba55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mentoring_slot_subject_subject_level" ("mentoring_slot_subject_id" uuid NOT NULL, "subject_level_id" uuid NOT NULL, CONSTRAINT "PK_ce605c0809210c84771b832d3af" PRIMARY KEY ("mentoring_slot_subject_id", "subject_level_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e72c6e721af6615d3e0ecfbbb" ON "mentoring_slot_subject_subject_level" ("mentoring_slot_subject_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f71cbffe7fc612965ca1cf846" ON "mentoring_slot_subject_subject_level" ("subject_level_id") `);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_translation" ADD CONSTRAINT "FK_7c28a69155cd4a5361118375222" FOREIGN KEY ("translatableId") REFERENCES "mentoring_slot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ADD CONSTRAINT "FK_4bbf77333a2dfdf0c5469edc52e" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ADD CONSTRAINT "FK_1a1f8b48a7f0e50c5676d6bca2a" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ADD CONSTRAINT "FK_0552ca80ee8d09dd0919c31caff" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ADD CONSTRAINT "FK_f019cbecbee31f2e18f23605b8a" FOREIGN KEY ("subjectCategoryId") REFERENCES "subject_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject" ADD CONSTRAINT "FK_9779ad6408c6a6325e0fc7dd36d" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject" ADD CONSTRAINT "FK_d7e9f6a43e9f58950e406f2e74a" FOREIGN KEY ("mentoringSlotId") REFERENCES "mentoring_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject_subject_level" ADD CONSTRAINT "FK_0e72c6e721af6615d3e0ecfbbb1" FOREIGN KEY ("mentoring_slot_subject_id") REFERENCES "mentoring_slot_subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject_subject_level" ADD CONSTRAINT "FK_8f71cbffe7fc612965ca1cf846c" FOREIGN KEY ("subject_level_id") REFERENCES "subject_level"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject_subject_level" DROP CONSTRAINT "FK_8f71cbffe7fc612965ca1cf846c"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject_subject_level" DROP CONSTRAINT "FK_0e72c6e721af6615d3e0ecfbbb1"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject" DROP CONSTRAINT "FK_d7e9f6a43e9f58950e406f2e74a"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_subject" DROP CONSTRAINT "FK_9779ad6408c6a6325e0fc7dd36d"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" DROP CONSTRAINT "FK_f019cbecbee31f2e18f23605b8a"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" DROP CONSTRAINT "FK_0552ca80ee8d09dd0919c31caff"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" DROP CONSTRAINT "FK_1a1f8b48a7f0e50c5676d6bca2a"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" DROP CONSTRAINT "FK_4bbf77333a2dfdf0c5469edc52e"`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot_translation" DROP CONSTRAINT "FK_7c28a69155cd4a5361118375222"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f71cbffe7fc612965ca1cf846"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e72c6e721af6615d3e0ecfbbb"`);
        await queryRunner.query(`DROP TABLE "mentoring_slot_subject_subject_level"`);
        await queryRunner.query(`DROP TABLE "mentoring_slot_subject"`);
        await queryRunner.query(`DROP TABLE "mentoring_slot"`);
        await queryRunner.query(`DROP TABLE "mentoring_slot_translation"`);
    }

}
