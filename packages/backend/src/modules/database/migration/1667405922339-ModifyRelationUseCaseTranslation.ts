import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRelationUseCaseTranslation1667405922339 implements MigrationInterface {
    name = 'ModifyRelationUseCaseTranslation1667405922339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" DROP CONSTRAINT "FK_9185b4e6d00a73b51a045abcadf"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" RENAME COLUMN "translatableId" TO "useCaseId"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" ADD CONSTRAINT "FK_c567c23e940fc69093a1673ae53" FOREIGN KEY ("useCaseId") REFERENCES "use_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" DROP CONSTRAINT "FK_c567c23e940fc69093a1673ae53"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" RENAME COLUMN "useCaseId" TO "translatableId"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" ADD CONSTRAINT "FK_9185b4e6d00a73b51a045abcadf" FOREIGN KEY ("translatableId") REFERENCES "use_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
