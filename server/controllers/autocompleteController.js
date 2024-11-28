const realEstateAPIService = require("../services/realEstateAPIService");

const getAutocompleteSuggestions = async (req, res) => {
  try {
    const { query } = req.query; 
    const suggestions = await realEstateAPIService.fetchAutocompleteSuggestions(
      query
    );
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error.message);
    res.status(500).json({ error: "Failed to fetch autocomplete suggestions" });
  }
};

module.exports = { getAutocompleteSuggestions };
