import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697548964832 implements MigrationInterface {
    name = 'Migration1697548964832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mentoring_slot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "slug" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'Incoming', "was_missed_by_mentor" boolean, "is_downgraded" boolean, CONSTRAINT "PK_c7cbee4b6bf6baa8f519617859f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mentoring_slot"`);
    }

}
