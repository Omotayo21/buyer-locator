import React, { useState } from "react";
import axios from "axios";
import BaseUrl from "./config";

/*const App = () => {
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
*/

function ComparableFinder() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);
   const [criteria, setCriteria] = useState({
    propertyType: false,
    squareFeet: false,
    yearBuilt: false,
    lotSquareFeet: false,
    lastSaleDate: false,
  });
const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCriteria({ ...criteria, [name]: checked });
  };
  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/api/comparables`,
       {
          address, // Replace with the actual address
          criteria,
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching comparables:", error);
    }
  };

  return (
    <div className="comparable-finder p-4 bg-white rounded shadow-md">
      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="address-input w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      <div>
      <label>
        <input
          type="checkbox"
          name="propertyType"
          checked={criteria.propertyType}
          onChange={handleCheckboxChange}
        />
        Match Property Type
      </label>
      <label>
        <input
          type="checkbox"
          name="squareFeet"
          checked={criteria.squareFeet}
          onChange={handleCheckboxChange}
        />
        Match Square Feet
      </label>
      <label>
        <input
          type="checkbox"
          name="yearBuilt"
          checked={criteria.yearBuilt}
          onChange={handleCheckboxChange}
        />
        Match Year Built
      </label>
      <label>
        <input
          type="checkbox"
          name="lotSquareFeet"
          checked={criteria.lotSquareFeet}
          onChange={handleCheckboxChange}
        />
        Match Lot Size
      </label>
      <label>
        <input
          type="checkbox"
          name="lastSaleDate"
          checked={criteria.lastSaleDate}
          onChange={handleCheckboxChange}
        />
        Match Last Sale Date
      </label>
    
    </div>
      <button
        onClick={handleSearch}
        className="search-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
      <div className="results mt-4">
        {results.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Bedrooms</th>
                <th className="py-3 px-6">Bathrooms</th>
                <th className="py-3 px-6">Year Built</th>
                <th className="py-3 px-6">Adjusted Value</th>
              </tr>
            </thead>
            <tbody>
              {results.map((comp) => (
                <tr key={comp.id} className="bg-white border-b">
                  <td className="py-4 px-6">{comp.address.address}</td>
                  <td className="py-4 px-6">{comp.bedrooms}</td>
                  <td className="py-4 px-6">{comp.bathrooms}</td>
                  <td className="py-4 px-6">{comp?.yearBuilt}</td>
                  <td className="py-4 px-6">
                    ${comp.adjustedValue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ): <p>No results found</p>}
      </div>
    </div>
  );
}

export default ComparableFinder;


/*const FilterForm = () => {
  const [criteria, setCriteria] = useState({
    propertyType: false,
    squareFeet: false,
    yearBuilt: false,
    lotSquareFeet: false,
    lastSaleDate: false,
  });

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://your-backend-url/api/comparables",
        {
          address: "123 Main St", // Replace with the actual address
          criteria,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comparables:", error);
    }
  };

  return (
    
  );
};

export default FilterForm;*/

