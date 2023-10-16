import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAppointmentGuestAttendanceName1693996501329 implements MigrationInterface {
    name = 'UpdateAppointmentGuestAttendanceName1693996501329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_guest" RENAME COLUMN "has_confirmed_attendance" TO "is_attending"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_guest" RENAME COLUMN "is_attending" TO "has_confirmed_attendance"`);
    }

}
