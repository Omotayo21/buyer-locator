const express = require("express");
const comparablesController= require("../controllers/comparablesController");

const router = express.Router();

router.post("/", comparablesController.getComparables);

module.exports = router;
