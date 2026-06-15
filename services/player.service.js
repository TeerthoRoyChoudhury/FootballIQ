import axios from "axios";

export const playerDetails = async (playerId) => {
  const response = await axios.get(
    "https://v3.football.api-sports.io/players",
    {
      params: {
        id: playerId,
        season: 2024,
      },
      headers: {
        "x-apisports-key": process.env.FOOTBALL_API_KEY,
      },
    },
  );
  return response.data;
};
