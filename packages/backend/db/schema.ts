import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

// // manage your schema
// export const countries = pgTable('countries', {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 256 }),
//   });
  
//   export const cities = pgTable('cities', {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 256 }),
//     countryId: integer('country_id').references(() => countries.id),
//   });