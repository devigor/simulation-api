import "reflect-metadata"
import { config } from "dotenv";
config();
import { DataSource } from "typeorm"
import { User } from "./entity/User"

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false,
    logging: NODE_ENV === "dev" ? true : false,
    entities: [User],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
})
