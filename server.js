const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const NbaTeams= require('./routes/NBATeams')
const cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use('/', NbaTeams);





  
app.listen(port, () => console.log(`Listening on port ${port}`));