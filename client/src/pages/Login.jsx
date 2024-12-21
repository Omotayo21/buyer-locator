import axios from "axios";
import React, { useState } from "react";
import { loginFn } from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { CgSpinnerAlt } from "react-icons/cg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { isChristmas } from "../utils";

const Login = ({ password, email, setEmail, setPassword }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || password.length < 8) {
      toast.error(
        "Please fill in all fields and password should contain at least 8 characters"
      );
      setLoading(false);
      return;
    }

    try {
      await loginFn(email, password); // Call the loginFn to authenticate
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (token) {
        document.documentElement.scrollTop = 0;
        navigate("/locate-buyer/find-buyers"); // Navigate to the find-buyers page
        setLoading(false);
        toast.success("Login Successful!");
      } else {
        setLoading(false);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 hidden md:flex items-center justify-center bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Login</h1>
      </div>
      <div className="flex-1 relative flex flex-col items-center justify-center bg-gray-100">
        {isChristmas && (
          <div className="md:block hidden absolute z-[100] top-0 animate-bounce right-10">
            <img loading="lazy" src="/assets/xmas.png" alt="" />
          </div>
        )}
        <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Login
          </h2>
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                value={email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={open ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="absolute top-5 right-4 cursor-pointer"
                >
                  {open ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none"
            >
              {!loading ? (
                "Login"
              ) : (
                <CgSpinnerAlt size={20} className="animate-spin" />
              )}
            </button>
          </form>
          <p
            onClick={() => navigate("/forgot-password")}
            className="mt-2 font-medium cursor-pointer text-blue-500"
          >
            Forgot password?
          </p>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
