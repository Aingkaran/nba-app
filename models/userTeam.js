const mongoose = require("mongoose");


const userTeam = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    players : {
        type: Array
        
    }


  
});

module.exports = mongoose.model("UserTeam", userTeam);