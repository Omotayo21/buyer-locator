import React, { useCallback, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import { fetchSuggestions } from "../services/apiService";
import { CgSpinner } from "react-icons/cg";

const Input = ({ setAddress, address, setComparable }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setSuggestions([]); // Clear suggestions after selection
    if (setComparable) {
      setComparable([]); // Clear comparables when an address is selected
    }
  };

  // Debounced function to delay API calls while typing
  const debouncedFetch = useCallback(
    _.debounce(async (searchQuery) => {
      if (searchQuery.trim()) {
        setLoading(true);
        try {
          await fetchSuggestions(searchQuery, setSuggestions, setLoading);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]); // Clear suggestions when input is cleared
        setLoading(false);
      }
    }, 500),
    [] // This runs only once when the component mounts
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setAddress(value);
    debouncedFetch(value); // Trigger debounced fetch
  };

  return (
    <div className="w-full relative">
  <input
    type="text"
    value={address}
    onChange={handleInputChange}
    placeholder="Enter property address"
    className="p-3 text-lg rounded-md border border-gray-300 w-full bg-white text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
  />
  {/* Render Suggestions */}
  {!loading ? (
    suggestions.length > 0 && (
      <div className="absolute bg-white border rounded-md shadow-md w-full max-h-60 overflow-y-auto mt-1">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-3 border-b cursor-pointer hover:bg-blue-500 hover:text-white text-gray-700"
            onClick={() => handleAddressSelect(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    )
  ) : (
    <div className="absolute flex justify-center items-center h-10 bg-blue-500 border rounded-md shadow-md w-full max-h-60 overflow-y-auto mt-1">
      <CgSpinner className="animate-spin" color="white" size={20} />
    </div>
  )}
</div>

  );
};

export default Input;
