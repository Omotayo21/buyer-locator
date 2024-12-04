const express = require("express");
const comparablesController= require("../controllers/comparablesController");

const router = express.Router();

router.post("/", comparablesController.getComparables);

router.post("/getById", comparablesController.getComparableById);
module.exports = router;
