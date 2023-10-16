import { MigrationInterface, QueryRunner } from "typeorm";

export class createUseCaseTranslation1667397672749 implements MigrationInterface {
    name = 'createUseCaseTranslation1667397672749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1bbf4310525429accff9df0787e"`);
        await queryRunner.query(`CREATE TABLE "use_case_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "UQ_e931f9906dd85ca192abd7b5906" UNIQUE ("title"), CONSTRAINT "PK_9a60c738b618cbc13aefdb43ac2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "use_case" DROP CONSTRAINT "UQ_0001122bb802229ec9cea2aa721"`);
        await queryRunner.query(`ALTER TABLE "use_case" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" ADD CONSTRAINT "FK_9185b4e6d00a73b51a045abcadf" FOREIGN KEY ("translatableId") REFERENCES "use_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3e6c8f467929d427333ca53e403" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3e6c8f467929d427333ca53e403"`);
        await queryRunner.query(`ALTER TABLE "use_case_translation" DROP CONSTRAINT "FK_9185b4e6d00a73b51a045abcadf"`);
        await queryRunner.query(`ALTER TABLE "use_case" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "use_case" ADD CONSTRAINT "UQ_0001122bb802229ec9cea2aa721" UNIQUE ("title")`);
        await queryRunner.query(`DROP TABLE "use_case_translation"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1bbf4310525429accff9df0787e" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
