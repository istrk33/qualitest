import { MigrationInterface, QueryRunner } from "typeorm";

export class cascadeNullTagUseCase1671721018608 implements MigrationInterface {
    name = 'cascadeNullTagUseCase1671721018608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_use_case" DROP CONSTRAINT "FK_8e90cc9b492950a2c2c4205b58a"`);
        await queryRunner.query(`ALTER TABLE "tag_use_case" ADD CONSTRAINT "FK_8e90cc9b492950a2c2c4205b58a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_use_case" DROP CONSTRAINT "FK_8e90cc9b492950a2c2c4205b58a"`);
        await queryRunner.query(`ALTER TABLE "tag_use_case" ADD CONSTRAINT "FK_8e90cc9b492950a2c2c4205b58a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
