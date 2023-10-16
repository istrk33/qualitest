import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameWrittedBySyllabus1695642471035 implements MigrationInterface {
    name = 'RenameWrittedBySyllabus1695642471035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabus" DROP CONSTRAINT "FK_583cb25705a35a648177c0dfec1"`);
        await queryRunner.query(`ALTER TABLE "syllabus" RENAME COLUMN "writedById" TO "authorId"`);
        await queryRunner.query(`ALTER TABLE "syllabus" ADD CONSTRAINT "FK_3c4e04f32665468c90f7215e38a" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabus" DROP CONSTRAINT "FK_3c4e04f32665468c90f7215e38a"`);
        await queryRunner.query(`ALTER TABLE "syllabus" RENAME COLUMN "authorId" TO "writedById"`);
        await queryRunner.query(`ALTER TABLE "syllabus" ADD CONSTRAINT "FK_583cb25705a35a648177c0dfec1" FOREIGN KEY ("writedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
