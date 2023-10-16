import { MigrationInterface, QueryRunner } from "typeorm";

export class createConnectionsAbsences1681218983829 implements MigrationInterface {
    name = 'createConnectionsAbsences1681218983829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "absence" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_justified" boolean NOT NULL, "userId" uuid, "updatedById" uuid, CONSTRAINT "PK_30089b15c0f880f026581218c16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "connection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "ip_address" character varying NOT NULL, "user_agent" character varying, "is_successful" boolean NOT NULL, "source_page" character varying, CONSTRAINT "PK_be611ce8b8cf439091c82a334b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "absence" ADD CONSTRAINT "FK_a2cd12ac708c89421eb6fd91ff5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "absence" ADD CONSTRAINT "FK_8638cd68f0baa0b53bd2de9e844" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "absence" DROP CONSTRAINT "FK_8638cd68f0baa0b53bd2de9e844"`);
        await queryRunner.query(`ALTER TABLE "absence" DROP CONSTRAINT "FK_a2cd12ac708c89421eb6fd91ff5"`);
        await queryRunner.query(`DROP TABLE "connection"`);
        await queryRunner.query(`DROP TABLE "absence"`);
    }

}
