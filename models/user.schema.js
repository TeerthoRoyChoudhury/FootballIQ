import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("Users", {
  id: uuid("User_id").defaultRandom().primaryKey(),

  firstName: varchar("First_Name", {
    length: 255,
  }).notNull(),

  lastName: varchar("Last_Name", {
    length: 255,
  }).notNull(),

  email: varchar("Email", {
    length: 255,
  })
    .unique()
    .notNull(),

  passwordHash: varchar("PasswordHash", {
    length: 255,
  }).notNull(),

  createdAt: timestamp("Created_At").defaultNow().notNull(),
});
