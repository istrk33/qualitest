import { MigrationInterface, QueryRunner } from "typeorm";

export class addImageToProduct1678368966761 implements MigrationInterface {
    name = 'addImageToProduct1678368966761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
    }

}
