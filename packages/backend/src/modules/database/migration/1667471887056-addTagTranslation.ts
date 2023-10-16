import { MigrationInterface, QueryRunner } from "typeorm";

export class addTagTranslation1667471887056 implements MigrationInterface {
    name = 'addTagTranslation1667471887056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "use_case_translation" DROP CONSTRAINT "FK_35654569e4cec13c1db27b8aae9"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" RENAME COLUMN "use_case_id" TO "translatableId"`);
        await queryRunner.query(`CREATE TABLE "tag_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_4fe12cfd6ee7ef80ddc27b5c02a" UNIQUE ("title"), CONSTRAINT "PK_7c69db2b86c15b3175141d52aad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" ADD CONSTRAINT "FK_9185b4e6d00a73b51a045abcadf" FOREIGN KEY ("translatableId") REFERENCES "use_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_translation" ADD CONSTRAINT "FK_83dc42cc2505a4ad040cb3ae8e2" FOREIGN KEY ("translatableId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_translation" DROP CONSTRAINT "FK_83dc42cc2505a4ad040cb3ae8e2"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" DROP CONSTRAINT "FK_9185b4e6d00a73b51a045abcadf"`);
        await queryRunner.query(`DROP TABLE "tag_translation"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" RENAME COLUMN "translatableId" TO "use_case_id"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" ADD CONSTRAINT "FK_35654569e4cec13c1db27b8aae9" FOREIGN KEY ("use_case_id") REFERENCES "use_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
