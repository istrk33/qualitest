import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRelationUseCaseTranslation1667406411087 implements MigrationInterface {
    name = 'ModifyRelationUseCaseTranslation1667406411087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" DROP CONSTRAINT "FK_c567c23e940fc69093a1673ae53"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" RENAME COLUMN "useCaseId" TO "use_case_id"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" ADD CONSTRAINT "FK_35654569e4cec13c1db27b8aae9" FOREIGN KEY ("use_case_id") REFERENCES "use_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" DROP CONSTRAINT "FK_35654569e4cec13c1db27b8aae9"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" RENAME COLUMN "use_case_id" TO "useCaseId"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" ADD CONSTRAINT "FK_c567c23e940fc69093a1673ae53" FOREIGN KEY ("useCaseId") REFERENCES "use_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
