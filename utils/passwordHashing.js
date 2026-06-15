import argon2 from "argon2";

export const hashingPassword = async (password) => {
  const postHashing = await argon2.hash(password);
  return postHashing;
};

export const isValidPassword = async (passwordHash, password) => {
  return await argon2.verify(passwordHash, password);
};
