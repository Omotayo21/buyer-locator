import React, { useCallback, useState } from "react";
import axios from "axios";
import BaseUrl from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

const Input = ({ setAddress, address }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setQuery(selectedAddress);
    setSuggestions([]); // Clear suggestions after selection
  };

  // Function to fetch suggestions from the AutoComplete API
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }
    try {
      const response = await axios.post(`${BaseUrl}/api/autocomplete`, {
        query: address,
      });

      const data = response.data;
      const addresses = data.data.map((item) => item.address); // Extract addresses
      console.log(addresses)
      setSuggestions(addresses); // Update suggestions with all addresses
      toast.success("AutoComplete Fetched Successfully");
    } catch (error) {
      toast.error("Failed to fetch suggestions");
      console.error(error);
    }
  };

  // Debounced function to delay API calls while typing
  const debouncedFetch = useCallback(
    _.debounce((address) => {
      fetchSuggestions(address);
    }, 500),
    [] // Empty dependencies array ensures the debounce function is created only once
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setQuery(value);
    setAddress(value)
    debouncedFetch(value); // Trigger debounced fetch
  };

  return (
    <div className="w-full relative">
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="Enter property address"
        className="p-3 text-lg rounded-md border border-gray-300 w-full"
      />
      {/* Render Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute bg-white border rounded-md shadow-md w-full max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 border-b cursor-pointer bg-purple-400 hover:bg-purple-500 text-white"
              onClick={() => handleAddressSelect(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
