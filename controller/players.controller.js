import axios from "axios";
import redis from "../src/redis.js";
import { playerDetails } from "../services/player.service.js";

export const getplayer = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const cachekey = `player:${playerId}`;
    const cacheddData = await redis.get(cachekey);
    if (cacheddData) {
      console.log("PLAYER CACHE HIT");

      return res.json(JSON.parse(cacheddData));
    }
    console.log("PLAYER CACHE MISS");
    if (!playerId)
      return res.status(401).json({ error: `Invalid request Parameters` });
    const response = await playerDetails(playerId);
    if (!response)
      return res.json({ error: `No player found with id ${playerId}` });
    const playerData = {
      aboutPlayer: response.response[0].player,
      stats: response.response[0].statistics,
    };
    await redis.set(cachekey, JSON.stringify(playerData), {
      EX: 3600,
    });
    return res.json(playerData);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};
