const express = require('express');

const NbaTeamController = require('../controllers/NBATeamController');

const router = express.Router();

// router.get('/', NbaTeamController.GetNbaPlayers);


router.get('/', NbaTeamController.GetNbaPlayers);
router.get('/PlayerStats', NbaTeamController.GetPlayerStats);
router.get('/SavedPlayerStats', NbaTeamController.SavedPlayerStats);




module.exports = router;