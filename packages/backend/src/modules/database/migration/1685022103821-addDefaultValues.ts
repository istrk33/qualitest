import { MigrationInterface, QueryRunner } from "typeorm";

export class addDefaultValues1685022103821 implements MigrationInterface {
    name = 'addDefaultValues1685022103821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "obsolete" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "obsolete" DROP DEFAULT`);
    }

}
