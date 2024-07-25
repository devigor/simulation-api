import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsInSimulationTable1721924632245 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TYPE status_enum AS ENUM ('PENDING', 'COMPLETED');
            ALTER TABLE simulations
            ADD COLUMN status status_enum DEFAULT 'PENDING',
            ADD COLUMN fileName VARCHAR,
            ADD COLUMN value VARCHAR;
            `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
