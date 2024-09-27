import {sql} from 'drizzle-orm';

export const user = sql.table('users', {
    id: sql.serial(),
    name: sql.text().notNull(),
    email: sql.text().notNull().unique(),
    createdAt: sql.timestamp().default(sql.now()),
})