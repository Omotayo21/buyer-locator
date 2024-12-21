import axios from "axios";
import { toast } from "react-toastify";
import BaseUrl from "../config";
import "react-toastify/dist/ReactToastify.css";

// Function to fetch suggestions from the AutoComplete API
export const fetchSuggestions = async (
  searchQuery,
  setSuggestions,
  setLoading
) => {
  if (!searchQuery) {
    setSuggestions([]); // Clear suggestions if input is empty
    return;
  }
  setLoading(false);
  try {
    setLoading(true);
    const response = await axios.post(`${BaseUrl}/api/autocomplete`, {
      query: searchQuery,
    });

    const data = response.data;
    const addresses = data.data.map((item) => item.address); // Extract addresses
    setSuggestions(addresses); // Update suggestions with all addresses
    if (data.data[0]?.address) {
      toast.success("Address Fetched Successfully");
    } else {
      toast.success("No Address found!!!");
    }
    return data;
  } catch (error) {
    toast.error("Failed to fetch suggestions");
    console.error(error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};
export const loginFn = async (email, password) => {
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
      return data;
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
    console.log(data);
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error?.response?.data?.message || error?.message;
    toast.error(errorMessage);
  }
};
export const registerFn = async (email, password) => {
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
    console.log(error)
    throw new Error(errorMessage); // Re-throw the error to handle it in the caller
  }
};
export const forgotPasswordMail = async (email, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${BaseUrl}/api/forgotpassword`,
      {
        email,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      toast.success("A password Reset link has been sent to your mail");
      return response;
    }
    console.log(response);
  } catch (error) {
    toast.error(error?.message);
    throw new Error(error?.message);
  } finally {
    setLoading(false);
  }
};

export const resetPasswordHandler = async (newpassword, setLoading, token) => {
  console.log("Token received in handler:", token);
  setLoading(true);
  try {
    if (token?.length > 0) {
      const user = await axios.post(`${BaseUrl}/api/resetpassword`, {
        token,
        newpassword,
      });
      setLoading(false);
      toast.success("Password changed successfully");
      return user;
    }
  } catch (error) {
    setLoading(false)
    toast.error(error?.response?.data?.error || error?.message);
    console.log(error);
    throw new Error(error?.message);
  } finally {
    setLoading(false);
  }
};
