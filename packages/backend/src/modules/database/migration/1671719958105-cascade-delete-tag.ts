import { MigrationInterface, QueryRunner } from "typeorm";

export class cascadeDeleteTag1671719958105 implements MigrationInterface {
    name = 'cascadeDeleteTag1671719958105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_translation" DROP CONSTRAINT "FK_83dc42cc2505a4ad040cb3ae8e2"`);
        await queryRunner.query(`ALTER TABLE "tag_translation" ADD CONSTRAINT "FK_83dc42cc2505a4ad040cb3ae8e2" FOREIGN KEY ("translatableId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_translation" DROP CONSTRAINT "FK_83dc42cc2505a4ad040cb3ae8e2"`);
        await queryRunner.query(`ALTER TABLE "tag_translation" ADD CONSTRAINT "FK_83dc42cc2505a4ad040cb3ae8e2" FOREIGN KEY ("translatableId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
