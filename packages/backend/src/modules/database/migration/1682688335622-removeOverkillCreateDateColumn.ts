import { MigrationInterface, QueryRunner } from "typeorm";

export class removeOverkillCreateDateColumn1682688335622 implements MigrationInterface {
    name = 'removeOverkillCreateDateColumn1682688335622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mission_skills_skill" ("missionId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_a27f1a7c8b8370fc2a7f2fc2113" PRIMARY KEY ("missionId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_90473bc735fbb7320344f16eb1" ON "mission_skills_skill" ("missionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab0fdc1236e711a30bc769e4c6" ON "mission_skills_skill" ("skillId") `);
        await queryRunner.query(`CREATE TABLE "mission_requirements_mission" ("missionId_1" uuid NOT NULL, "missionId_2" uuid NOT NULL, CONSTRAINT "PK_544654b15c4adb7927e5e72f0f5" PRIMARY KEY ("missionId_1", "missionId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac9d38102c704ab4e66d194e55" ON "mission_requirements_mission" ("missionId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_41edb8b940ae2554ce6d8185dc" ON "mission_requirements_mission" ("missionId_2") `);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_start" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_start" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_end" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_end" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "discount_start" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "discount_start" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "discount_end" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "discount_end" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active_start" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active_start" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active_end" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active_end" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "primary" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "limited_duration" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "periodic" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "cooldown" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "max_restart" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "min_completion" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission_skills_skill" ADD CONSTRAINT "FK_90473bc735fbb7320344f16eb1e" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mission_skills_skill" ADD CONSTRAINT "FK_ab0fdc1236e711a30bc769e4c62" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_requirements_mission" ADD CONSTRAINT "FK_ac9d38102c704ab4e66d194e55b" FOREIGN KEY ("missionId_1") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mission_requirements_mission" ADD CONSTRAINT "FK_41edb8b940ae2554ce6d8185dc2" FOREIGN KEY ("missionId_2") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission_requirements_mission" DROP CONSTRAINT "FK_41edb8b940ae2554ce6d8185dc2"`);
        await queryRunner.query(`ALTER TABLE "mission_requirements_mission" DROP CONSTRAINT "FK_ac9d38102c704ab4e66d194e55b"`);
        await queryRunner.query(`ALTER TABLE "mission_skills_skill" DROP CONSTRAINT "FK_ab0fdc1236e711a30bc769e4c62"`);
        await queryRunner.query(`ALTER TABLE "mission_skills_skill" DROP CONSTRAINT "FK_90473bc735fbb7320344f16eb1e"`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "min_completion" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "max_restart" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "cooldown" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "periodic" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "limited_duration" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "active" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mission" ALTER COLUMN "primary" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active_end" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active_end" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active_start" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active_start" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "active" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "discount_end" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "discount_end" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "discount_start" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "quest" ALTER COLUMN "discount_start" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_end" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_end" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_start" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "discount_start" SET NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41edb8b940ae2554ce6d8185dc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac9d38102c704ab4e66d194e55"`);
        await queryRunner.query(`DROP TABLE "mission_requirements_mission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab0fdc1236e711a30bc769e4c6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90473bc735fbb7320344f16eb1"`);
        await queryRunner.query(`DROP TABLE "mission_skills_skill"`);
    }

}
