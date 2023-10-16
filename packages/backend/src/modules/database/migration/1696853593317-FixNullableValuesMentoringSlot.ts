import { MigrationInterface, QueryRunner } from "typeorm";

export class FixNullableValuesMentoringSlot1696853593317 implements MigrationInterface {
    name = 'FixNullableValuesMentoringSlot1696853593317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ALTER COLUMN "status" SET DEFAULT 'Incoming'`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ALTER COLUMN "was_missed_by_mentor" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ALTER COLUMN "is_downgraded" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ALTER COLUMN "is_downgraded" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ALTER COLUMN "was_missed_by_mentor" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentoring_slot" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
