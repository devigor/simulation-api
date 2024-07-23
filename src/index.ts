import * as express from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { userRouter } from "./routers/user";
import { authRouter } from "./routers/auth";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
    app.listen(port, () => {
      console.log(`Servidor rodando em ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });