const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const NbaTeams= require('./NBATeam')

 
console.log(NbaTeams.Hornets.id)


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    axios.get(`http://api.sportradar.us/nba/trial/v7/en/teams/${NbaTeams.Raptors.id}/profile.json?api_key=c83bmnmqk6rphqcyetq3r928`)
    .then((response=>{
        let Team =[]

        for (let i=0;i<(response.data.players).length;i++){
            console.log(response.data.players[i]);
            Team.push(response.data.players[i])
        }
        res.send(
            `Player: ${Team}  `,
          );
    }))
    .catch((err)=>{
        console.log(err);
    })

  
});

app.listen(port, () => console.log(`Listening on port ${port}`));