import { searchTeam, getSquad } from "../services/team.service.js";
import redis from "../src/redis.js";

export const getTeamDetails = async (req, res) => {
  try {
    const teamname = req.params.teamname;
    if (!teamname)
      return res.status(404).json({ error: `Invalid request params` });
    const teamDetails = await searchTeam(teamname);
    const selectedDetails = teamDetails.response[0];
    return res.json({
      id: selectedDetails.team.id,
      name: selectedDetails.team.name,
      code: selectedDetails.team.code,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

export const getSquadDetails = async (req, res) => {
  try {
    const teamname = req.params.teamname;
    const cachekey = `squad:${teamname}`;
    const cacheddata = await redis.get(cachekey);
    if (cacheddata) {
      console.log("CACHE HIT");
      return res.json(JSON.parse(cacheddata));
    }
    console.log("CACHE MISS");
    const team = await searchTeam(teamname);
    const teamResponse = team.response[0];
    const teamId = teamResponse.team.id;
    if (!teamId) return res.status(401).json({ error: `No Id found` });
    const squadDetails = await getSquad(teamId);
    const players = squadDetails.data.response[0].players;
    await redis.set(cachekey, JSON.stringify(players), {
      EX: 3600,
    });
    return res.json(players);
    // return res.json(squadDetails.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: error.message });
  }
};
