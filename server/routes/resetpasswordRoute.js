const express = require("express");
const { resetPassword } = require("../controllers/resetController.js");

const router = express.Router();

router.post("/", resetPassword);

module.exports = router;