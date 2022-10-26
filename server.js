const express = require('express');
const NbaTeams= require('./routes/NBATeams')
const cors = require('cors')
const User = require('./models/user')

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

mongoose.connect(
    "mongodb+srv://NBA-APP:Aingkaran@nba-app.douk6cs.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Mongoose Is Connected");
    }
  );



const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));






const app = express();
const port = process.env.PORT || 5000;
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use('/', NbaTeams);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);




  
app.listen(port, () => console.log(`Listening on port ${port}`));