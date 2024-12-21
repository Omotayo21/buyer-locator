import React, { useState } from "react";
import { forgotPasswordMail } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { isChristmas } from "../utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    try {
      await forgotPasswordMail(email, setLoading);
      navigate("/login"); // Only navigate on success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Reset Password</h1>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-100">
        {isChristmas && (
          <div className="md:block hidden absolute z-10 top-10 animate-bounce right-10">
            <img loading="lazy" src="/assets/xmas.png" alt="Christmas" />
          </div>
        )}
        <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Enter your email address, and we'll send you a reset link.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              disabled={loading || !email}
              type="submit"
              className="w-full disabled:bg-blue-400 disabled:cursor-not-allowed p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
