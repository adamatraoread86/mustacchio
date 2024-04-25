const express = require("express");
const router = express.Router();

const bltController = require("../controllers/bltController");

router.get("/players", bltController.getPlayers, bltController.renderPlayers);

router.get("/teams", bltController.getTeams);

router.get("/games", bltController.getGames);

router.get("/stats", bltController.getStats);

module.exports = router;
