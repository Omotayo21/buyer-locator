const axios = require("axios");
const dotenv = require("dotenv");
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
      },
    };

    axios
      .request(options)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(`Error fetching autocomplete suggestions: ${error.message}`);
    console.error(`Error details: ${error.stack}`);
    throw error;
  }
};

const fetchPropertyDetails = async (addressObject) => {
  const addressString = JSON.stringify(addressObject.address);
  console.log("Type of address:", typeof address);
  //const decodedAddress = decodeURIComponent(addressString);

  const options = {
    method: "POST",
    url: "https://api.realestateapi.com/v2/PropertySearch",
    headers: {
      accept: "application/json",
      "x-user-id": "UniqueUserIdentifier",
      "content-type": "application/json",
      "x-api-key": "REALESTATEWHOLESALERELITE-fba6-74f3-8509-f6b34ae25259",
    },
    data: {
      ids_only: false,
      obfuscate: false,
      summary: false,
      size: 2,
      properties_owned_min: 10,
      portfolio_purchased_last12_min: 3,
      address: addressString,
    },
  };

  axios
    .request(options)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};

module.exports = { fetchAutocompleteSuggestions, fetchPropertyDetails };
