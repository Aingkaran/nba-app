const mongoose = require("mongoose");


const userTeam = new mongoose.Schema({
    user: {
        type: String
    },

    players : {
        type: [[String,String]],
    }

  
});

module.exports = mongoose.model("UserTeam", userTeam);