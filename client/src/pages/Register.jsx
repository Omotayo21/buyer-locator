import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterFn } from "../services/apiService";
import { CgEye, CgSpinnerAlt } from "react-icons/cg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

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
      await RegisterFn(email, password);
      navigate("/login"); // Only navigate on success
      setLoginEmail(email);
      setLoginPassword(password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Ensures loading state is cleared
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleRegister} className="mt-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
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
            <div className="relative">
              <input
                type={open ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div
                onClick={() => setOpen((prev) => !prev)}
                className="absolute top-5 right-4 cursor-pointer">
                {open ? <IoMdEye size={20}/> : <IoMdEyeOff size={20}/>}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 flex justify-center py-2 mt-4 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none">
            {!loading ? (
              "Register"
            ) : (
              <CgSpinnerAlt size="20px" className="animate-spin" />
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-purple-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
