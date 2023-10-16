import { MigrationInterface, QueryRunner } from "typeorm";

export class linkUserDetails1667813793387 implements MigrationInterface {
    name = 'linkUserDetails1667813793387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3e6c8f467929d427333ca53e403"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tagId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tag_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_detail_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_7fbd789ba2d9f9643ff3be7e7b0" UNIQUE ("user_detail_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0a9eb8b07a401c3d5eb7f80a8f5" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7fbd789ba2d9f9643ff3be7e7b0" FOREIGN KEY ("user_detail_id") REFERENCES "users_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7fbd789ba2d9f9643ff3be7e7b0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0a9eb8b07a401c3d5eb7f80a8f5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_7fbd789ba2d9f9643ff3be7e7b0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_detail_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tag_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_verified"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tagId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3e6c8f467929d427333ca53e403" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
