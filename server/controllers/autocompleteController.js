const realEstateService = require("../services/realEstateAPIService");

const getAutocompleteSuggestions = async (req, res) => {
  try {
    const { query } = req.query; // User input for autocomplete
    const suggestions = await realEstateService.fetchAutocompleteSuggestions(
      query
    );
    res.status(200).json(suggestions); // Send suggestions back to frontend
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error.message);
    res.status(500).json({ error: "Failed to fetch autocomplete suggestions" });
  }
};

module.exports = { getAutocompleteSuggestions };
