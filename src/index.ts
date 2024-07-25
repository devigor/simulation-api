import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import * as cron from 'node-cron';
import { AppDataSource } from "./data-source";
import { userRouter } from "./routers/user";
import { authRouter } from "./routers/auth";
import { simulationRouter } from "./routers/simulation";
import { createReports } from "./services/cronService";
import { log } from "console";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/simulations", simulationRouter);

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

// Roda a cada 10min
cron.schedule('*/10 * * * *', async () => {
  await createReports();
})