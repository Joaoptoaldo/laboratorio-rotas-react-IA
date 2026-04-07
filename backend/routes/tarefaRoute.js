import { Router } from "express";
import { db } from "../database/db.js";
import { tarefa } from "../database/schema.js";
import { eq } from "drizzle-orm";

export const router = Router();

router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content veio vazio" });
    }

    const [novaTarefa] = await db
      .insert(tarefa)
      .values({ content })
      .returning();

    res
      .status(201)
      .json({ message: "Nova tarefa inserida", tarefa: novaTarefa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Deu pau no servidor" });
  }
});

router.get("/", async (req, res) => {
  try {
    const getTarefa = await db.select().from(tarefa);

    res.status(200).json(getTarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor wow" });
  }
});

router.patch("/:idTarefa", async (req, res) => {
  try {
    const { idTarefa } = req.params;

    if (!idTarefa) {
      return res.status(400).json({ message: "Sem o id nao da ne meu" });
    }

    const [editado] = await db
      .update(tarefa)
      .set({ isComplete: true })
      .where(eq(tarefa.id, idTarefa))
      .returning();

    if (!editado) {
      return res.status(404).json({ message: "nao achei essa tarefa beleza" });
    }

    res.status(200).json({ message: "Tarefa atualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internamente ferrado" });
  }
});