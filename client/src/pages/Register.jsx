import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerFn } from "../services/apiService";
import { CgSpinnerAlt } from "react-icons/cg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { isChristmas } from "../utils";

const Register = ({
  setEmail,
  email,
  setPassword,
  password,
  setLoginEmail,
  setLoginPassword,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleRegister = async (e) => {
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
      await registerFn(email, password);
      navigate("/login"); // Only navigate on success
      setLoginEmail(email);
      setLoginPassword(password);
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Ensures loading state is cleared
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 hidden md:flex items-center justify-center bg-blue-600 text-white">
        <h1
          className={`text-4xl font-bold ${
            isChristmas ? "animate-bounce" : ""
          }`}
        >
          Register
        </h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100">
        {isChristmas && (
          <div className="md:block hidden absolute z-[100] top-16 animate-bounce right-10">
            <img loading="lazy" src="/assets/xmas.png" alt="Christmas" />
          </div>
        )}
        <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Register
          </h2>
          <form onSubmit={handleRegister} className="mt-6">
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
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
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
              type="submit"
              className="w-full px-4 disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center py-2 mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              {!loading ? (
                "Register"
              ) : (
                <CgSpinnerAlt size="20px" className="animate-spin" />
              )}
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
