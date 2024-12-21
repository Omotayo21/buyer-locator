import axios from "axios";
import React, { useState } from "react";
import BaseUrl from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const BuyerLocator = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* Navigation Links */}
      <nav className="flex space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
        <Link
          to="find-buyers" // Correct relative path
          className={`font-medium font-mono text-lg ${
            location.pathname === "/locate-buyer/find-buyers"
              ? "pb-2 text-blue-600 border-b-4 border-blue-600"
              : "pb-3 text-gray-600 hover:text-blue-600"
          } transition-all duration-300`}
        >
          Find Buyers
        </Link>
        <Link
          to="find-comps" // Correct relative path
          className={`font-medium font-mono text-lg ${
            location.pathname.includes("/locate-buyer/find-comps")
              ? "pb-2 text-blue-600 border-b-4 border-blue-600"
              : "pb-3 text-gray-600 hover:text-blue-600"
          } transition-all duration-300`}
        >
          Find Comparables
        </Link>
      </nav>

      {/* Outlet for rendering child routes */}
      <div className="w-full mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerLocator;
