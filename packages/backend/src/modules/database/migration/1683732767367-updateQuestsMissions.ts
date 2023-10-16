import { MigrationInterface, QueryRunner } from "typeorm";

export class updateQuestsMissions1683732767367 implements MigrationInterface {
    name = 'updateQuestsMissions1683732767367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission_requirements_mission" DROP CONSTRAINT "FK_41edb8b940ae2554ce6d8185dc2"`);
        await queryRunner.query(`ALTER TABLE "mission" ADD "position" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ADD "parentId" uuid`);
        await queryRunner.query(`ALTER TABLE "mission" ADD CONSTRAINT "FK_2417d05975207474c18be6111ff" FOREIGN KEY ("parentId") REFERENCES "mission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mission_requirements_mission" ADD CONSTRAINT "FK_41edb8b940ae2554ce6d8185dc2" FOREIGN KEY ("missionId_2") REFERENCES "mission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission_requirements_mission" DROP CONSTRAINT "FK_41edb8b940ae2554ce6d8185dc2"`);
        await queryRunner.query(`ALTER TABLE "mission" DROP CONSTRAINT "FK_2417d05975207474c18be6111ff"`);
        await queryRunner.query(`ALTER TABLE "mission" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "mission" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "mission_requirements_mission" ADD CONSTRAINT "FK_41edb8b940ae2554ce6d8185dc2" FOREIGN KEY ("missionId_2") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
