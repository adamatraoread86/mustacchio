const express = require("express");
const router = express.Router();
const unauthorizedController = require("../controllers/unauthorizedController");

router.get("/", unauthorizedController.getUnauthorized);



module.exports = router;
