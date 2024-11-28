import React, { useState } from "react";
import axios from "axios";
import BaseUrl from "./config";

const App = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState("");
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState([]); // Define buyerInfo state

  const fetchAutocompleteSuggestions = async (searchQuery) => {
    if (searchQuery === null || searchQuery === undefined) {
      console.error(
        "Error fetching autocomplete suggestions: searchQuery is null or undefined"
      );
      return;
    }

    try {
      const response = await axios.post(
        `${BaseUrl}/api/autocomplete`,
        { query: searchQuery }
      );

      const data = response.data;
      const addresses = data.data.map((item) => item.address);
      setSuggestions(addresses);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error.message);
    }
  };

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/properties`, {
        address,
      });
      const data = response.data;
      const buyers = data.data.filter(
        (buyer) => buyer.portfolioPurchasedLast12Months >= 3
      );
      const buyerInfoArray = buyers.map((buyer) => ({
        id: buyer.id,
        companyName: buyer.companyName,
        address: buyer.address.address,
        portfolioPurchasedLast12Months: buyer.portfolioPurchasedLast12Months,
      }));
      setBuyerInfo(buyerInfoArray); 
      setPropertyDetails(data.data[0]);
    } catch (error) {
      console.error("Error fetching property details:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      fetchAutocompleteSuggestions(value);
    }
  };

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setQuery(selectedAddress);
    setSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (address.trim() !== "") {
      fetchPropertyDetails();
    }
  };

  return (
    <div>
      <h2>Buyer Locator</h2>
      {/* Autocomplete Section */}
      <div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter property address"
          
          className="p-3 text-lg rounded-md border border-gray-300 w-6/12" 
        />
        <ul
         
          className="p-0 m-0 border border-gray-300 w-6/12"
        >
          {suggestions.map((suggestion, index) => (
            <li
             
              className="p-3 border-b cursor-pointer"
              onClick={() => handleAddressSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
      {/* Property Details Section */}
      <form onSubmit={handleSearch}>
        <button
          type="submit"
         
          className="p-3 text-lg rounded-md border-none bg-[#4CAF50] text-[#fff] cursor-pointer "
        >
          Fetch Property Details
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Address</th>
            <th>Properties Purchased in Last 12 Months</th>
          </tr>
        </thead>
        <tbody>
          {buyerInfo.map((buyer) => (
            <tr key={buyer.id}>
              <td>{buyer.id}</td>
              <td>{buyer.companyName}</td>
              <td>{buyer.address}</td>
              <td>{buyer.portfolioPurchasedLast12Months}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;