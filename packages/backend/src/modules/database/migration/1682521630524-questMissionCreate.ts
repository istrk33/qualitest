import { MigrationInterface, QueryRunner } from "typeorm";

export class questMissionCreate1682521630524 implements MigrationInterface {
    name = 'questMissionCreate1682521630524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quest_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_e31ec7fce254e9384aca8801227" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cover" character varying NOT NULL, "icon" character varying NOT NULL, "slug" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "discount_start" TIMESTAMP NOT NULL DEFAULT now(), "discount_end" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL, "active_start" TIMESTAMP NOT NULL DEFAULT now(), "active_end" TIMESTAMP NOT NULL DEFAULT now(), "islandId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_0d6873502a58302d2ae0b82631c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "localeCode" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "translatableId" uuid, CONSTRAINT "PK_59edf917507ed9d35f1234cd9fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cover" character varying NOT NULL, "icon" character varying NOT NULL, "slug" character varying NOT NULL, "primary" boolean NOT NULL, "active" boolean NOT NULL, "estimated_duration" integer NOT NULL, "limited_duration" integer NOT NULL, "remuneration" numeric(10,2) NOT NULL, "periodic" boolean NOT NULL, "cooldown" integer NOT NULL, "max_restart" integer NOT NULL, "min_completion" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "questId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_54f1391034bc7dd30666dee0d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quest_translation" ADD CONSTRAINT "FK_a45dd2adcd4468116ab2043289e" FOREIGN KEY ("translatableId") REFERENCES "quest"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quest" ADD CONSTRAINT "FK_5d88e673dfe6fcb250566bf7789" FOREIGN KEY ("islandId") REFERENCES "island"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quest" ADD CONSTRAINT "FK_f2b54f5fd362c599545e82f04f1" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quest" ADD CONSTRAINT "FK_7a782034867b374ed14fced1186" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_translation" ADD CONSTRAINT "FK_76bf05bbfd255e3c040b1f1ea0e" FOREIGN KEY ("translatableId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission" ADD CONSTRAINT "FK_dec57138c9e28d54eac422ba1c6" FOREIGN KEY ("questId") REFERENCES "quest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission" ADD CONSTRAINT "FK_03a5913ac707b6058c41ed23d61" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission" ADD CONSTRAINT "FK_17c8f0ed6d6b7fc4a0ff34b00e3" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission" DROP CONSTRAINT "FK_17c8f0ed6d6b7fc4a0ff34b00e3"`);
        await queryRunner.query(`ALTER TABLE "mission" DROP CONSTRAINT "FK_03a5913ac707b6058c41ed23d61"`);
        await queryRunner.query(`ALTER TABLE "mission" DROP CONSTRAINT "FK_dec57138c9e28d54eac422ba1c6"`);
        await queryRunner.query(`ALTER TABLE "mission_translation" DROP CONSTRAINT "FK_76bf05bbfd255e3c040b1f1ea0e"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP CONSTRAINT "FK_7a782034867b374ed14fced1186"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP CONSTRAINT "FK_f2b54f5fd362c599545e82f04f1"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP CONSTRAINT "FK_5d88e673dfe6fcb250566bf7789"`);
        await queryRunner.query(`ALTER TABLE "quest_translation" DROP CONSTRAINT "FK_a45dd2adcd4468116ab2043289e"`);
        await queryRunner.query(`DROP TABLE "mission"`);
        await queryRunner.query(`DROP TABLE "mission_translation"`);
        await queryRunner.query(`DROP TABLE "quest"`);
        await queryRunner.query(`DROP TABLE "quest_translation"`);
    }

}
