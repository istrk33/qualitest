import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableToHasBeenSeenNotice1692698201482 implements MigrationInterface {
    name = 'AddNullableToHasBeenSeenNotice1692698201482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "has_been_seen" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "has_been_seen" SET NOT NULL`);
    }

}
