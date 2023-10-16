import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAppointmentAttendance1693989351633 implements MigrationInterface {
    name = 'UpdateAppointmentAttendance1693989351633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_guest" DROP COLUMN "hasConfirmedTheAppointment"`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" DROP COLUMN "hasConfirmedTheAppointmentTookPlace"`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" DROP COLUMN "hasMissedTheAppointement"`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" ADD "has_confirmed_attendance" boolean`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" ADD "has_confirmed_appointment_took_place" boolean`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" ADD "has_missed_the_appointement" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_guest" DROP COLUMN "has_missed_the_appointement"`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" DROP COLUMN "has_confirmed_appointment_took_place"`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" DROP COLUMN "has_confirmed_attendance"`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" ADD "hasMissedTheAppointement" boolean`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" ADD "hasConfirmedTheAppointmentTookPlace" boolean`);
        await queryRunner.query(`ALTER TABLE "appointment_guest" ADD "hasConfirmedTheAppointment" boolean`);
    }

}
