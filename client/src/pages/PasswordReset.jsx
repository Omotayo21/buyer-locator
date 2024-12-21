import React, { useEffect, useState } from "react";
import { resetPasswordHandler } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { isChristmas } from "../utils";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword || newPassword.length < 8) {
      toast.error("Please fill in all fields and ensure the password is at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await resetPasswordHandler(newPassword, setLoading, token);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    console.log("Token from URL:", urlToken);
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Reset Password</h1>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-100">
        {isChristmas && (
          <div className="md:block hidden absolute z-[100] top-0 animate-bounce right-10">
            <img loading="lazy" src="/assets/xmas.png" alt="" />
          </div>
        )}
        <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create New Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Enter your new password and confirm it to reset your account.
          </p>
          <form onSubmit={handlePasswordReset}>
            {/* New Password */}
            <div className="mb-4">
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="New Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <input
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={!newPassword || !confirmNewPassword || loading}
              type="submit"
              className="w-full flex justify-center items-center p-3 bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
            >
              {loading ? (
                <CgSpinner className="animate-spin" size={20} />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
