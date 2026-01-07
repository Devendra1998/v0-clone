import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const db = globalThis.prisma || new PrismaClient({
    adapter,
    log: ["query", "error", "warn", "info"],
});

if (process.env.NODE_ENV === "development") globalThis.prisma = db;

export default db;