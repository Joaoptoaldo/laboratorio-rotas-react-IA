import { eq } from "drizzle-orm";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../database/db.js";
import { tarefa } from "../database/schema.js";


// middleware de autenticação JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token mal formatado." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}

export const router = Router();

// aplica o middleware de autenticação em todas as rotas
router.use(authMiddleware);


// cria tarefa vinculada ao usuário autenticado
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user?.userId;

    if (!content) {
      return res.status(400).json({ message: "Content veio vazio" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const [novaTarefa] = await db
      .insert(tarefa)
      .values({ content, userId })
      .returning();

    res
      .status(201)
      .json({ message: "Nova tarefa inserida", tarefa: novaTarefa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Deu pau no servidor" });
  }
});


// lista tarefas apenas do usuário autenticado
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    const getTarefa = await db.select().from(tarefa).where(eq(tarefa.userId, userId));
    res.status(200).json(getTarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor wow" });
  }
});


// PATCH protegido (toggle isComplete)
router.patch("/:idTarefa", async (req, res) => {
  try {
    const { idTarefa } = req.params;
    const userId = req.user?.userId;

    if (!idTarefa) {
      return res.status(400).json({ message: "Sem o id nao da ne meu" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    // busca tarefa
    const [t] = await db.select().from(tarefa).where(eq(tarefa.id, idTarefa), eq(tarefa.userId, userId));
    if (!t) {
      return res.status(404).json({ message: "Tarefa não encontrada ou não pertence ao usuário." });
    }

    const [editado] = await db
      .update(tarefa)
      .set({ isComplete: !t.isComplete })
      .where(eq(tarefa.id, idTarefa), eq(tarefa.userId, userId))
      .returning();

    res.status(200).json({ message: "Tarefa atualizada", tarefa: editado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internamente ferrado" });
  }
});

// PATCH para editar texto da tarefa
router.patch("/:idTarefa/edit", async (req, res) => {
  try {
    const { idTarefa } = req.params;
    const { content } = req.body;
    const userId = req.user?.userId;
    if (!idTarefa || !content) {
      return res.status(400).json({ message: "ID e novo conteúdo obrigatórios" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    const [editado] = await db
      .update(tarefa)
      .set({ content })
      .where(eq(tarefa.id, idTarefa), eq(tarefa.userId, userId))
      .returning();
    if (!editado) {
      return res.status(404).json({ message: "Tarefa não encontrada ou não pertence ao usuário." });
    }
    res.status(200).json({ message: "Tarefa editada", tarefa: editado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao editar tarefa" });
  }
});

// DELETE para remover tarefa
router.delete("/:idTarefa", async (req, res) => {
  try {
    const { idTarefa } = req.params;
    const userId = req.user?.userId;
    if (!idTarefa) {
      return res.status(400).json({ message: "Sem o id da tarefa" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    const [removida] = await db
      .delete(tarefa)
      .where(eq(tarefa.id, idTarefa), eq(tarefa.userId, userId))
      .returning();
    if (!removida) {
      return res.status(404).json({ message: "Tarefa não encontrada ou não pertence ao usuário." });
    }
    res.status(200).json({ message: "Tarefa removida", tarefa: removida });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao remover tarefa" });
  }
});