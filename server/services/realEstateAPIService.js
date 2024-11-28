const axios = require('axios');

const API_KEY = process.env.REAL_ESTATE_API_KEY;
const BASE_URL = 'https://api.realestate.com';

const fetchAutocompleteSuggestions = async (query) => {
  const url = `${BASE_URL}/v2/AutoComplete?query=${encodeURIComponent(
    query
  )}&api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data; // Assuming the API response structure
};

module.exports = { fetchAutocompleteSuggestions }

const fetchPropertyDetails = async (address) => {
  const url = `${BASE_URL}/v2/PropertySearch?address=${encodeURIComponent(
    address
  )}&api_key=${API_KEY}&properties_owned_min=3&portfolio_purchased_last12_min=3`;

  const response = await axios.get(url);
  return response.data; // Return filtered data directly from the API
};

module.exports = { fetchPropertyDetails };