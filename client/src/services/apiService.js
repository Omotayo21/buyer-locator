import axios from "axios";
import { toast } from "react-toastify";
import BaseUrl from "../config";
import "react-toastify/dist/ReactToastify.css";

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
export const LoginFn = async (email, password) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/api/auth/login`,
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;

    // Check if the login was successful
    if (response.status === 200) {
      // Save the token in localStorage
      localStorage.setItem("token", data.token);

      // Optionally save user data
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
    console.log(data);
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error?.message || "An error occurred during login.";
    toast.error(errorMessage);
  }
};
export const RegisterFn = async (email, password) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/api/auth/register`,
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 201) {
      toast.success("Registration Successful!");
      return response.data; // Success, return data
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message;
    toast.error(errorMessage);
    throw new Error(errorMessage); // Re-throw the error to handle it in the caller
  }
};

