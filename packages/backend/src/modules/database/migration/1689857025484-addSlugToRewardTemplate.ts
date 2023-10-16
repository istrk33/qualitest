import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToRewardTemplate1689857025484 implements MigrationInterface {
    name = 'AddSlugToRewardTemplate1689857025484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reward_template" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reward_template" DROP COLUMN "slug"`);
    }

}
