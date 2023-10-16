import { MigrationInterface, QueryRunner } from "typeorm";

export class removeTitleFromTag1667473544687 implements MigrationInterface {
    name = 'removeTitleFromTag1667473544687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531" UNIQUE ("title")`);
    }

}
