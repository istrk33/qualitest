import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableToCompanyFiles1693383942559 implements MigrationInterface {
    name = 'AddNullableToCompanyFiles1693383942559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "kbis" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "vigilanceCertificate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "vigilanceCertificate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "kbis" SET NOT NULL`);
    }

}
