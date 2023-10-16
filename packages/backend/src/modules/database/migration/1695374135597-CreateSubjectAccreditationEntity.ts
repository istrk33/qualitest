import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubjectAccreditationEntity1695374135597 implements MigrationInterface {
    name = 'CreateSubjectAccreditationEntity1695374135597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject_accreditation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, "updatedById" uuid, "subjectId" uuid, "userAccreditedId" uuid, CONSTRAINT "PK_9ac591a9ca8feee5772fd29a2a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" ADD CONSTRAINT "FK_649a7cf48c521ed2e26b71db0c4" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" ADD CONSTRAINT "FK_d7959e6d90ca274a83b9a2f739c" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" ADD CONSTRAINT "FK_9ee06e84aec96ccee9defc2a7bf" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" ADD CONSTRAINT "FK_c9851540532ff1c98c99096dff5" FOREIGN KEY ("userAccreditedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_accreditation" DROP CONSTRAINT "FK_c9851540532ff1c98c99096dff5"`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" DROP CONSTRAINT "FK_9ee06e84aec96ccee9defc2a7bf"`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" DROP CONSTRAINT "FK_d7959e6d90ca274a83b9a2f739c"`);
        await queryRunner.query(`ALTER TABLE "subject_accreditation" DROP CONSTRAINT "FK_649a7cf48c521ed2e26b71db0c4"`);
        await queryRunner.query(`DROP TABLE "subject_accreditation"`);
    }

}
