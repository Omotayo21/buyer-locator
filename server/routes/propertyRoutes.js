const express = require("express");
const { getPropertyDetails } = require("../controllers/propertyController");

const router = express.Router();

router.post("/", getPropertyDetails);

module.exports = router;
