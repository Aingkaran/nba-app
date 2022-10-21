const express = require('express');

const NbaTeamController = require('../controllers/NBATeamController');

const router = express.Router();

// router.get('/', NbaTeamController.GetNbaPlayers);


router.get('/', NbaTeamController.GetNbaPlayers);




module.exports = router;