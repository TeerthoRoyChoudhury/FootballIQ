import redis from "../src/redis.js";

export const testRedis = async (req, res) => {
  await redis.set("name", "Teerhto");
  const value = await redis.get("name");
  return res.json({ value });
};
