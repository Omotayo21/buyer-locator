const express = require("express");
const {
  getAutocompleteSuggestions,
} = require("../controllers/autocompleteController");

const router = express.Router();

router.post("/", getAutocompleteSuggestions);

module.exports = router;
