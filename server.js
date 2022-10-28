const express = require('express');
const NbaTeams= require('./routes/NBATeams')
const cors = require('cors')
const User = require('./models/user')
const passport = require("passport")
const passportlocal= require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt= require("bcryptjs")
const session= require("express-session")
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/passportConfig")(passport);

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});


app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});






app.use('/', NbaTeams);


app.listen(port, () => console.log(`Listening on port ${port}`));