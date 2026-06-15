import express from "express";
import userRouter from "./routes/user.routes.js";
import playerRouter from "./routes/player.routes.js";
import teamRouter from "./routes/team.routes.js";
import "./src/redis.js";
import redisRouter from "./routes/redis-test.routes.js";

const app = express();
const PORT = process.env.PORT ?? 8000;
app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({ status: `Server working fine` });
});

app.use("/user", userRouter);

app.use("/player", playerRouter);

app.use("/team", teamRouter);

app.use("/redis", redisRouter);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
