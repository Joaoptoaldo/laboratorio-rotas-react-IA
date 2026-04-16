import {drizzle} from 'drizzle-orm/node-postgres';
import {Pool} from "pg"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

console.log("conectando ao banco de dados...");
pool.connect()
    .then(() => console.log("conectado ao banco de dados!"))
    .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

export const db = drizzle(pool);