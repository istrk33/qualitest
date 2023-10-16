import { MigrationInterface, QueryRunner } from "typeorm";

export class addLocalToUseCaseTranslation1667401828531 implements MigrationInterface {
    name = 'addLocalToUseCaseTranslation1667401828531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" ADD "locale_code" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" DROP COLUMN "locale_code"`);
    }

}
