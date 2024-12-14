import axios from "axios";
import React, { useState } from "react";
import { LoginFn } from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CgSpinnerAlt } from "react-icons/cg";

const Login = ({ password, email, setEmail, setPassword }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log(loading);
    if (!email || !password || password.length < 8) {
      toast.error("Please fill in all fields and password should contain at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      await LoginFn(email, password); // Call the LoginFn to authenticate
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (token) {
        toast.success("Login Successful!");
        document.documentElement.scrollTop = 0;
        navigate("/locate-buyer/find-buyers"); // Navigate to the find-buyers page
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email">
              Email
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center px-4 py-2 mt-4 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none">
            {!loading ? "Login" : <CgSpinnerAlt className="animate-spin" />}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-purple-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
