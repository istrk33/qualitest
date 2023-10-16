import { MigrationInterface, QueryRunner } from "typeorm";

export class nullableImageForCurrency1681307475347 implements MigrationInterface {
    name = 'nullableImageForCurrency1681307475347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency" ALTER COLUMN "image" SET NOT NULL`);
    }

}
