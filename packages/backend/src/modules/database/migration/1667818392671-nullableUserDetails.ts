import { MigrationInterface, QueryRunner } from "typeorm";

export class nullableUserDetails1667818392671 implements MigrationInterface {
    name = 'nullableUserDetails1667818392671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "birth_place" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "birth_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "entry_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "address_primary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "address_secondary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "zipcode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "discord_tag" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "pseudo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "twitter" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "linkedin" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "linkedin" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "twitter" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "pseudo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "discord_tag" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "zipcode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "address_secondary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "address_primary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "entry_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "birth_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_detail" ALTER COLUMN "birth_place" SET NOT NULL`);
    }

}
