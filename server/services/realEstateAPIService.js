const axios = require("axios");
const dotenv = require("dotenv");
const { search, options } = require("../routes/autocompleteRoutes");
require("dotenv").config();
const API_KEY = process.env.REAL_ESTATE_API_KEY;


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
 
};

const fetchPropertyComparables = async (address) => {
  try {
    const API_KEY = process.env.REAL_ESTATE_API_KEY; 

    const options = {
      method: "POST",
      url: "https://api.realestateapi.com/v3/PropertyComps",
      headers: {
        accept: "application/json",

        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
      data: {
        address: address,
       
        max_results: 50,
      },
    };

    const response = await axios.request(options);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw new Error("Failed to fetch property data from the API");
  }
};
module.exports = {
  fetchAutocompleteSuggestions,
  fetchPropertyDetails,
  fetchPropertyComparables,
};
