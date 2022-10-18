const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const NbaTeams= require('./NBATeam')

 
console.log(NbaTeams.Hornets.id)


const app = express();
const port = process.env.PORT || 5000;

app.get('/api', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


  
app.listen(port, () => console.log(`Listening on port ${port}`));