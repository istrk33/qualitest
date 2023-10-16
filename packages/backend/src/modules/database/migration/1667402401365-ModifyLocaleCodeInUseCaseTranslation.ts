import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyLocaleCodeInUseCaseTranslation1667402401365 implements MigrationInterface {
    name = 'ModifyLocaleCodeInUseCaseTranslation1667402401365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" RENAME COLUMN "locale_code" TO "localeCode"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" RENAME COLUMN "localeCode" TO "locale_code"`);
    }

}
