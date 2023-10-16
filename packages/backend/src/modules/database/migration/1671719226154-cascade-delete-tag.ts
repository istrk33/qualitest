import { MigrationInterface, QueryRunner } from "typeorm";

export class cascadeDeleteTag1671719226154 implements MigrationInterface {
    name = 'cascadeDeleteTag1671719226154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_e7ba4974cfa176a3291b1d06972"`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_e7ba4974cfa176a3291b1d06972" FOREIGN KEY ("parentTagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_e7ba4974cfa176a3291b1d06972"`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_e7ba4974cfa176a3291b1d06972" FOREIGN KEY ("parentTagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
