const mongoose = require("mongoose");


const userTeam = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },

    players : {
        type: [String,String],
    }

  
});

module.exports = mongoose.model("UserTeam", userTeam);