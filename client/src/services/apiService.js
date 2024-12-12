import axios from "axios";
import { toast } from "react-toastify";
import BaseUrl from "../config";

// Function to fetch suggestions from the AutoComplete API
export const fetchSuggestions = async (searchQuery, setSuggestions) => {
  if (!searchQuery) {
    setSuggestions([]); // Clear suggestions if input is empty
    return;
  }
  try {
    const response = await axios.post(`${BaseUrl}/api/autocomplete`, {
      query: searchQuery,
    });

    const data = response.data;
    const addresses = data.data.map((item) => item.address); // Extract addresses
    setSuggestions(addresses); // Update suggestions with all addresses
    toast.success("Address Fetched Successfully");
  } catch (error) {
    toast.error("Failed to fetch suggestions");
    console.error(error);
  }
};
export const Login = async (email, password) => {
  if (!email || !password) {
    return;
  }
  try {
    const response = await axios.post(`${BaseUrl}/api/autocomplete`, {
      email,
      password,
    });

    const data = response.data;
    console.log(data)
    toast.success("Login Successful");
  } catch (error) {
    toast.error("Failed to fetch suggestions");
    console.error(error);
  }
};
