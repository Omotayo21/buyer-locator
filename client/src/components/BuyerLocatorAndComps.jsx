import axios from "axios";
import React, { useState } from "react";
import BaseUrl from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const BuyerLocator = () => {
    const location=useLocation()
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Navigation Links */}
      <nav className="flex space-x-4">
        <Link
        className={` font-medium font-mono ${
            location.pathname===("/locate-buyer/find-buyers") 
              ? " pb-2 text-[#4608AD] border-b-[#4608AD] border-b-4  text-[#4608AD"
              : "pb-3  text-gray-500"
          }`}
          to="find-buyers" // Correct relative path
        //   className="text-blue-500 hover:text-blue-700 transition">
        >
          Find Buyers
        </Link>
        <Link
          to="find-comps" // Correct relative path
          className={` font-medium font-mono ${
            location.pathname===("/locate-buyer/find-comps") 
              ? " pb-2 text-[#4608AD] border-b-[#4608AD] border-b-4  text-[#4608AD"
              : "pb-3  text-gray-500"
          }`}>
          Find Comparables
        </Link>
      </nav>

      {/* Outlet for rendering child routes */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerLocator;
