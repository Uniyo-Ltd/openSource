import { sql } from 'drizzle-orm';
import dotenv from 'dotenv';
dotenv.config();

const postgres = `postgresql://${process.env.DATABASE_URL}`;

export const db = sql`${postgres}`;