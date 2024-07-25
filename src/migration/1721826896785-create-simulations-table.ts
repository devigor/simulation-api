import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSimulationsTable1721826896785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "simulations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "userId",
                    type: "int"
                },
                {
                    name: "simulationDate",
                    type: "timestamp"
                }
            ]
        }), true);

        await queryRunner.createForeignKey("simulations", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("simulations");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("simulations", foreignKey);
        await queryRunner.dropTable("simulations");
    }

}
