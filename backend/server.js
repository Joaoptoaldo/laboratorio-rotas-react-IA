import bcrypt from "bcrypt";
import cors from "cors";
import "dotenv/config";
import { eq } from "drizzle-orm";
import express from "express";
import jwt from "jsonwebtoken";
import { db } from "./database/db.js";
import { user } from "./database/schema.js";
import { router } from "./routes/tarefaRoute.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/tarefa", router);
app.get("/", (req, res) => {
  res.send("Aqui é o backend!");
});

app.listen(port, () => {
  console.log("servidor rodando na porta", port);
});

// Criar uma tabela de usuários (ex: user com campos id, email, senhaHash).
// Rotas de cadastro (/api/register) e login (/api/login).

// Registro de usuário
app.post("/api/register", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }
  try {
    // Verifica se já existe usuário
    const existe = await db.select().from(user).where(eq(user.email, email));
    if (existe.length > 0) {
      return res.status(409).json({ message: "Email já cadastrado." });
    }
    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);
    await db.insert(user).values({ email, senhaHash });
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
});

// Login de usuário
app.post("/api/login", async (req, res) => {
  console.log("Recebido registro:", req.body.email);
  const { email, senha } = req.body;

  try {
    const usuarios = await db.select().from(user).where(eq(user.email, email));
    if (usuarios.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }
    const usuario = usuarios[0];
    const senhaOk = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaOk) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }
    // Gera token JWT
    const token = jwt.sign({ userId: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login." });
  }
});