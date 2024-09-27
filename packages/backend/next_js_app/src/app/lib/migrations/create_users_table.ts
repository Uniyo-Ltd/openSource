   // lib/migrations/create_users_table.ts
   import { sql } from 'drizzle-orm';

   export const createUsersTable = sql`
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       email TEXT NOT NULL UNIQUE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
   `;