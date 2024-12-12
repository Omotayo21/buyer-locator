import React, { useCallback, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import { fetchSuggestions } from "../services/apiService";

const Input = ({ setAddress, address, setComparable }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setSuggestions([]); // Clear suggestions after selection
  };



  // Debounced function to delay API calls while typing
  const debouncedFetch = useCallback(
    _.debounce((searchQuery) => {
      fetchSuggestions(searchQuery,setSuggestions);
    }, 500),
    [] // Empty dependencies array ensures the debounce function is created only once
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setAddress(value);
    if (setComparable) {
      setComparable([]);
      debouncedFetch(value)
    } else {
      debouncedFetch(value); // Trigger debounced fetch
    }
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
