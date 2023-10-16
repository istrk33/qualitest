import { MigrationInterface, QueryRunner } from "typeorm";

export class removeImageFromWallet1681210862313 implements MigrationInterface {
    name = 'removeImageFromWallet1681210862313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_wallet" DROP COLUMN "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_wallet" ADD "image" character varying NOT NULL`);
    }

}
