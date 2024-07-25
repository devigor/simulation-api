import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewStatusEnum1721933782012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE status_enum ADD VALUE 'IN_PROGRESS'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
