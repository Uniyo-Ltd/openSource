   // lib/services/users.ts
   import { getDatabaseConnection } from '../../../../../db/schema';
   import { user } from '../models/user';

   export async function createUser(name: string, email: string) {
    const db = await getDatabaseConnection();
    return await db.insert(user).values({ name, email }).returning();
  }

   export async function getAllUsers(page: number, limit: number) {
     const offset = (page - 1) * limit;
     return await getDatabaseConnection.select().from(user).limit(limit).offset(offset);
   }

   export async function deleteUser(id: number) {
     return await getDatabaseConnection.delete(user).where('id', '=', id);
   }