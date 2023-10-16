import { MigrationInterface, QueryRunner } from "typeorm";

export class fixSkillRelation1676630497042 implements MigrationInterface {
    name = 'fixSkillRelation1676630497042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" ADD "subjectId" uuid`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_43971097fc2662afd9961f2bdc5" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_43971097fc2662afd9961f2bdc5"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "subjectId"`);
    }

}
