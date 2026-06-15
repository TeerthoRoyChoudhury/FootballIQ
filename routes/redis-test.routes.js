import express from "express";
const router = express.Router();
import * as redisController from "../controller/redis.controller.js";
router.get("/redis-test", redisController.testRedis);

export default router;
