import db from "../src/index.js";
import { users } from "../models/user.schema.js";
import { eq } from "drizzle-orm";

export const ifExists = async (email) => {
  const [result] = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(eq(users.email, email));
  return result;
};

export const insertDb = async (firstName, lastName, email, password) => {
  // if (!firstName || !lastName || !email || !password) return -1;
  const [postInsertion] = await db
    .insert(users)
    .values({
      firstName,
      lastName,
      email,
      passwordHash: password,
    })
    .returning({ userId: users.id });

  return postInsertion;
};

export const getData = async (email) => {
  const [result] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      password: users.passwordHash,
    })
    .from(users)
    .where(eq(users.email, email));
  return result;
};
