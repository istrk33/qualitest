import { MigrationInterface, QueryRunner } from "typeorm";

export class createTagUseCaseEntity1666706167775 implements MigrationInterface {
    name = 'createTagUseCaseEntity1666706167775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_use_case" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hasPermission" boolean NOT NULL, "useCaseId" uuid, "tagId" uuid, CONSTRAINT "PK_0c91a817e5e2c6be839cf09bbcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tag_use_case" ADD CONSTRAINT "FK_1d1dad152b7f469adbdd77f687c" FOREIGN KEY ("useCaseId") REFERENCES "use_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_use_case" ADD CONSTRAINT "FK_8e90cc9b492950a2c2c4205b58a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_use_case" DROP CONSTRAINT "FK_8e90cc9b492950a2c2c4205b58a"`);
        await queryRunner.query(`ALTER TABLE "tag_use_case" DROP CONSTRAINT "FK_1d1dad152b7f469adbdd77f687c"`);
        await queryRunner.query(`DROP TABLE "tag_use_case"`);
    }

}
