import React, { useCallback, useState } from "react";
import axios from "axios";
import BaseUrl from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

const Input = ({ setAddress, address }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setIsLoading] = useState(false);
  //   const [address, setAddress] = useState("");
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState([]); // Define buyerInfo state

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setQuery(selectedAddress);
    setSuggestions([]);
  };

  // Function to fetch suggestions from the AutoComplete API
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }
    // toast.loading("loadig");
    setIsLoading(true)
    try {
      const response = await axios.post(`${BaseUrl}/api/autocomplete`, {
        query: searchQuery,
      });

      const data = response.data;
      setIsLoading(false)
      const addresses = data.data.map((item) => item.address);
      setSuggestions(addresses);
      toast.success("AutoComplete Fetched Successfully");
      console.log(data);
    } catch(error) {
        toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced function to delay API calls while typing
  const debouncedFetch = useCallback(
    _.debounce((searchQuery) => {
      fetchSuggestions(searchQuery);
    }, 500),
    [] // Empty dependencies array ensures the debounce function is created only once
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFetch(value); // Trigger debounced fetch
    
  };
  return (
    <div className="w-full  relative">
       
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter property address"
        className="p-3 text-lg rounded-md border border-gray-300 w-full"
      />
      {suggestions.map((suggestion, index) => (
        <div
          className="p-3 border-b cursor-pointer bg-purple-400 w-full absolute"
          onClick={() => handleAddressSelect(suggestion)}>
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default Input;
