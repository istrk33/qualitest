import { MigrationInterface, QueryRunner } from "typeorm";

export class productOptionValuesFix1672159661734 implements MigrationInterface {
    name = 'productOptionValuesFix1672159661734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_option_value_translation" DROP CONSTRAINT "FK_ad5ebfe4748c917d8107eadc2f0"`);
        await queryRunner.query(`ALTER TABLE "product_option_value_translation" ADD CONSTRAINT "FK_ad5ebfe4748c917d8107eadc2f0" FOREIGN KEY ("translatableId") REFERENCES "product_option_value"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_option_value_translation" DROP CONSTRAINT "FK_ad5ebfe4748c917d8107eadc2f0"`);
        await queryRunner.query(`ALTER TABLE "product_option_value_translation" ADD CONSTRAINT "FK_ad5ebfe4748c917d8107eadc2f0" FOREIGN KEY ("translatableId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
