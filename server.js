const express = require('express');
const bodyParser = require('body-parser');
const NbaTeams= require('./routes/NBATeams')
const cors = require('cors')

const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDb = "mongodb+srv://NBA-APP:Aingkaran@nba-app.douk6cs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));



const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
  })
);



const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use('/', NbaTeams);





  
app.listen(port, () => console.log(`Listening on port ${port}`));