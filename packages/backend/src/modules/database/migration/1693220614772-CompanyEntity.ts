import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyEntity1693220614772 implements MigrationInterface {
    name = 'CompanyEntity1693220614772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "siret" character varying NOT NULL, "slug" character varying NOT NULL, "invoicingCity" character varying NOT NULL, "invoicingAddress" character varying NOT NULL, "invoicingZipcode" character varying NOT NULL, "invoicingCountry" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "kbis" character varying NOT NULL, "vigilanceCertificate" character varying NOT NULL, "parentCompanyId" uuid, CONSTRAINT "UQ_3a1413b6c95d7b7874673ab623f" UNIQUE ("siret"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_aa8f384a989014b9f826b7fdc5e" FOREIGN KEY ("parentCompanyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_aa8f384a989014b9f826b7fdc5e"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
