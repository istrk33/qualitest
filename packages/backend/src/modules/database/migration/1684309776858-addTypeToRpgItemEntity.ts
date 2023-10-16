import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeToRpgItemEntity1684309776858 implements MigrationInterface {
    name = 'AddTypeToRpgItemEntity1684309776858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item" ADD "type" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rpg_item" DROP COLUMN "type"`);
    }

}
