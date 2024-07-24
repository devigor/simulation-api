import { MigrationInterface, QueryRunner } from "typeorm";
import { hashPassword } from "../utils/hash";
import { UserRole } from "../entity/User";

export class AddSuperUser1721822164218 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const password = await hashPassword('admin');
        await queryRunner.query(`
            INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@admin.com', '${password}', '${UserRole.SUPERUSER}')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
