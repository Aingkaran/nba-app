const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const NBA = require("nba");

// function to get the data from the API 

 




const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    axios.get(`http://api.sportradar.us/nba/trial/v7/en/players/ab532a66-9314-4d57-ade7-bb54a70c65ad/profile.json?api_key=c83bmnmqk6rphqcyetq3r928`)
    .then((response=>{
        console.log(response.data.full_name);
        res.send(
            `Player: ${response.data.full_name} `,
          );
    }))
    .catch((err)=>{
        console.log(err);
    })

  
});

app.listen(port, () => console.log(`Listening on port ${port}`));