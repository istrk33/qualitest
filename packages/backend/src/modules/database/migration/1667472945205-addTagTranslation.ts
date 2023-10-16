import { MigrationInterface, QueryRunner } from "typeorm";

export class addTagTranslation1667472945205 implements MigrationInterface {
    name = 'addTagTranslation1667472945205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_translation" DROP CONSTRAINT "FK_03b55da21995264ba815f3a666c"`);
        await queryRunner.query(`ALTER TABLE "tag_translation" RENAME COLUMN "tagId" TO "translatableId"`);
        await queryRunner.query(`ALTER TABLE "tag_translation" ADD CONSTRAINT "FK_83dc42cc2505a4ad040cb3ae8e2" FOREIGN KEY ("translatableId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_translation" DROP CONSTRAINT "FK_83dc42cc2505a4ad040cb3ae8e2"`);
        await queryRunner.query(`ALTER TABLE "tag_translation" RENAME COLUMN "translatableId" TO "tagId"`);
        await queryRunner.query(`ALTER TABLE "tag_translation" ADD CONSTRAINT "FK_03b55da21995264ba815f3a666c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
