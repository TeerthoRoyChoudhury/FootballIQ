import * as playerController from "../controller/players.controller.js";
import express from "express";
const router = express.Router();
import { isLoggedIn } from "../middleware/isloggedin.middleware.js";

router.get("/:playerId", isLoggedIn, playerController.getplayer);

export default router;
