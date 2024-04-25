const express = require("express");
const router = express.Router();
const admin = require("../admin");

const stylesController = require("../controllers/stylesController");




router.get("/", stylesController.getStyles);


router.get("/new", admin, stylesController.getNewStyle);


router.post("/new", admin, stylesController.createNewStyle);


router.get("/:slug", stylesController.getSingleStyle);



module.exports = router;
