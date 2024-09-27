import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from 'dotenv';
dotenv.config();

const postgres = `postgresql://${process.env.DATABASE_URL}`;

const client = new Client({
  connectionString: `postgresql://${process.env.DATABASE_URL}`,
});

await client.connect();
const db = drizzle(client);



// using check docuemtation 
// npm i drizzle-orm pg
// npm i -D drizzle-kit @types/pg