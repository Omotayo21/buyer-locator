const axios = require("axios");
const dotenv = require("dotenv");
const { search } = require("../routes/autocompleteRoutes");
require("dotenv").config();
const API_KEY = process.env.REAL_ESTATE_API_KEY;
const BASE_URL = "https://api.realestateapi.com";

const fetchAutocompleteSuggestions = async (query) => {
  try {
    const options = {
      method: "POST",
      url: "https://api.realestateapi.com/v2/AutoComplete",
      headers: {
        "x-user-id": "UniqueUserIdentifier",
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
      data: {
        search: query,
        search_types: ["A"],
      },
    };
   const response = await axios.request(options);
   return response.data;
    //axios
    //  .request(options)
    //  .then((res) => console.log(res.data))
    //  .catch((err) => console.error(err));
  //return res.data
    } catch (error) {
    console.error(`Error fetching autocomplete suggestions: ${error.message}`);
    console.error(`Error details: ${error.stack}`);
    throw error;
  }
};

const fetchPropertyDetails = async (encodedAddress) => {
  const addressString = JSON.stringify(encodedAddress);
  console.log("Type of address:", typeof encodedAddress);
  //const decodedAddress = decodeURIComponent(addressString);

  const options = {
    method: "POST",
    url: "https://api.realestateapi.com/v2/PropertySearch",
    headers: {
      accept: "application/json",
      "x-user-id": "UniqueUserIdentifier",
      "content-type": "application/json",
      "x-api-key": API_KEY,
    },
    data: {
      ids_only: false,
      obfuscate: false,
      summary: false,
      size: 2,
      properties_owned_min: 10,
      portfolio_purchased_last12_min: 3,
      address: encodedAddress,
    },
  };
 const response = await axios.request(options);
 return response.data;
  //axios
    //.request(options)
    //.then((res) => console.log(res.data))
    //.catch((err) => console.error(err));
};

module.exports = { fetchAutocompleteSuggestions, fetchPropertyDetails };
