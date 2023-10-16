import { MigrationInterface, QueryRunner } from "typeorm";

export class cascadeNullTagUsers1671720094201 implements MigrationInterface {
    name = 'cascadeNullTagUsers1671720094201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0a9eb8b07a401c3d5eb7f80a8f5"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0a9eb8b07a401c3d5eb7f80a8f5" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0a9eb8b07a401c3d5eb7f80a8f5"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0a9eb8b07a401c3d5eb7f80a8f5" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
