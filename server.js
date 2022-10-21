const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const NbaTeams= require('./routes/NBATeams')



const app = express();
const port = process.env.PORT || 5000;
app.use('/', NbaTeams);





  
app.listen(port, () => console.log(`Listening on port ${port}`));