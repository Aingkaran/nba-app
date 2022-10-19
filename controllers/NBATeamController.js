const NbaTeams= require('../NBATeam')
const axios = require("axios");






exports.GetNbaPlayers = async (req, res) => {
    const api = await fetch(`http://api.sportradar.us/nba/trial/v7/en/teams/${NbaTeams.Raptors.id}/profile.json?api_key=c83bmnmqk6rphqcyetq3r928`);

    if (api.ok) {
        const response = await api.json();


        for (let i=0;i<(response.players).length;i++){
            console.log(response.players[i].full_name);
        }

        try {
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }
};
