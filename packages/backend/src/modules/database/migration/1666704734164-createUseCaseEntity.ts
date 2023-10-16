import { MigrationInterface, QueryRunner } from "typeorm";

export class createUseCaseEntity1666704734164 implements MigrationInterface {
    name = 'createUseCaseEntity1666704734164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "use_case" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_0001122bb802229ec9cea2aa721" UNIQUE ("title"), CONSTRAINT "UQ_153cc7245b2be65a69602f402c0" UNIQUE ("code"), CONSTRAINT "PK_fda163b23a8fdeaa6a42d5310b0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "use_case"`);
    }

}
