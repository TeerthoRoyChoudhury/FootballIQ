import axios from "axios";

export const searchTeam = async (teamname) => {
  const response = await axios.get("https://v3.football.api-sports.io/teams", {
    params: { search: teamname },
    headers: {
      "x-apisports-key": process.env.FOOTBALL_API_KEY,
    },
  });
  return response.data;
};

export const getSquad = async (teamid) => {
  const squad = await axios.get(
    "https://v3.football.api-sports.io/players/squads",
    {
      params: {
        team: teamid,
      },
      headers: {
        "x-apisports-key": process.env.FOOTBALL_API_KEY,
      },
    },
  );
  return squad;
};
