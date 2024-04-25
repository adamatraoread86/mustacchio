const express = require("express");

const router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/login", usersController.getLogin);

router.get("/register", usersController.getRegister);

router.get("/favoritestyles", usersController.favoriteStyles);

router.post("/login", usersController.postLogin);

router.post("/register", usersController.postRegister);

router.get("/logout", usersController.getLogout);

router.get("/updateAdminPrivileges", usersController.getAdminPrivileges);

router.post("/updateAdminPrivileges", usersController.updateAdminPrivileges);

router.get("/saveAsFavorite/:styleId", usersController.saveAsFavorite);

module.exports = router;