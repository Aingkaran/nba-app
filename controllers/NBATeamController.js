const NbaTeams= require('../NBATeam')
const axios = require("axios");






// exports.GetNbaPlayers = async (req, res) => {
//     const api = await fetch(`http://api.sportradar.us/nba/trial/v7/en/teams/${NbaTeams.AllTeams["Raptors"].id}/profile.json?api_key=c83bmnmqk6rphqcyetq3r928`);

//     if (api.ok) {
//         const response = await api.json();


//         for (let i=0;i<(response.players).length;i++){
//             console.log(response.players[i].full_name);
//         }

//         try {
//             res.json(response);
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };


exports.GetNbaPlayers = (req,res) => {
    const options = {
        method: 'GET',
        url: `http://api.sportradar.us/nba/trial/v7/en/teams/${NbaTeams.AllTeams[req.query.Team].id}/profile.json?api_key=c83bmnmqk6rphqcyetq3r928`,
        params: {Team: "Raptors"},
        
    }
    

    axios.request(options).then((response) => {
        res.json(response)
    }).catch((error) => {
        console.error(error)
    })
}