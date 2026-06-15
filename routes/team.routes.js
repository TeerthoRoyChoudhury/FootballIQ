import express from "express";
import { isLoggedIn } from "../middleware/isloggedin.middleware.js";
import {
  getTeamDetails,
  getSquadDetails,
} from "../controller/team.controller.js";
const router = express.Router();

router.get("/:teamname", isLoggedIn, getTeamDetails);

router.get("/:teamname/squad", isLoggedIn, getSquadDetails);

export default router;
