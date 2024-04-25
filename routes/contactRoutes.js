const express = require("express");
const router = express.Router();
const admin = require("../admin");
const contactController = require("../controllers/contactController");

router.get("/new", contactController.getContact);

router.post("/create", contactController.createContact);

router.post("/:id/update", admin, contactController.editContact);

router.get("/:id/edit", admin, contactController.getEditContact);


router.get("/", admin, contactController.getContactList);

module.exports = router;
