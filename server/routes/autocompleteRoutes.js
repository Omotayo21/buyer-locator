const express = require("express");
const {
  getAutocompleteSuggestions,
} = require("../controllers/autocompleteController");

const router = express.Router();

router.get("/", getAutocompleteSuggestions);

module.exports = router;
