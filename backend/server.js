import express from "express";
import "dotenv/config";
import { router } from "./routes/tarefaRoute.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/tarefa", router);
app.get("/", (req, res) => {
  res.send("aqui e o backend");
});
app.listen(port, () => {
  console.log("servidor rodando na porta", port);
});