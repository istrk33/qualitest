import { MigrationInterface, QueryRunner } from "typeorm";

export class addArchivedToUser1667905873869 implements MigrationInterface {
    name = 'addArchivedToUser1667905873869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_archived" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_archived"`);
    }

}
