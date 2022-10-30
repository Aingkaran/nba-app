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

const UserTeam= require('./models/userTeam')

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

      const newUser = new UserTeam({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});



app.post("/myTeam", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Doesn't Exists");
    if (doc) {

      const newTeam = new UserTeam({
        players: req.body.players,

      });
      await newTeam.save();
      res.send("MyTeam Created");
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
      });
    }
  })(req, res, next);
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});



app.delete("/logout", (req,res) => {
  req.logOut()
  res.redirect("/")
  console.log(`-------> User Logged out`)
})



app.post("/logout", async function (req, res, next) {

  console.log("logout user", req.user)

  try {
      req.logOut(req.user, function (err) {
          console.log("logout callback called")
          if (err) {
              console.log("error", err)
              return next(err);

          }
      
      });
  } catch (e) {
      console.log(e)
  }res.json(req.isAuthenticated())
  console.log("logout called")
});




app.use('/', NbaTeams);


app.listen(port, () => console.log(`Listening on port ${port}`));