import { MigrationInterface, QueryRunner } from "typeorm";

export class islandsWorlds1679595253741 implements MigrationInterface {
    name = 'islandsWorlds1679595253741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "world_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_2028c9c9b6f78fe08e231e84766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "island_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_1ea56a93af188f083815362a861" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "island" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "background_color" character varying NOT NULL, "slug" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "worldId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_b81bfcb70cf7d9d45a4dbdb606a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "world" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "background_color" character varying NOT NULL, "slug" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_9a0e469d5311d0d95ce1202c990" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "world_translation" ADD CONSTRAINT "FK_ec29c9e732099fac2fd142a5e77" FOREIGN KEY ("translatableId") REFERENCES "world"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "island_translation" ADD CONSTRAINT "FK_416fd4078001fd7842c1ed29b90" FOREIGN KEY ("translatableId") REFERENCES "island"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "island" ADD CONSTRAINT "FK_765119b4c3b5f9bb4edcd24c852" FOREIGN KEY ("worldId") REFERENCES "world"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "island" ADD CONSTRAINT "FK_ae85afbc1574439e8f1708fc4c4" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "island" ADD CONSTRAINT "FK_3ca52887ecc027d07f797c94ff4" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "world" ADD CONSTRAINT "FK_ad8f6e175adececaedc5030fc69" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "world" ADD CONSTRAINT "FK_273b6d48f514e06acfaab1e15a4" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "world" DROP CONSTRAINT "FK_273b6d48f514e06acfaab1e15a4"`);
        await queryRunner.query(`ALTER TABLE "world" DROP CONSTRAINT "FK_ad8f6e175adececaedc5030fc69"`);
        await queryRunner.query(`ALTER TABLE "island" DROP CONSTRAINT "FK_3ca52887ecc027d07f797c94ff4"`);
        await queryRunner.query(`ALTER TABLE "island" DROP CONSTRAINT "FK_ae85afbc1574439e8f1708fc4c4"`);
        await queryRunner.query(`ALTER TABLE "island" DROP CONSTRAINT "FK_765119b4c3b5f9bb4edcd24c852"`);
        await queryRunner.query(`ALTER TABLE "island_translation" DROP CONSTRAINT "FK_416fd4078001fd7842c1ed29b90"`);
        await queryRunner.query(`ALTER TABLE "world_translation" DROP CONSTRAINT "FK_ec29c9e732099fac2fd142a5e77"`);
        await queryRunner.query(`DROP TABLE "world"`);
        await queryRunner.query(`DROP TABLE "island"`);
        await queryRunner.query(`DROP TABLE "island_translation"`);
        await queryRunner.query(`DROP TABLE "world_translation"`);
    }

}
