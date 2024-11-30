import axios from "axios";
import React, { useState } from "react";
import BaseUrl from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import { Link, Outlet } from "react-router-dom";

const BuyerLocator = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Navigation Links */}
      <nav className="flex space-x-4">
        <Link
          to="find-buyers" // Correct relative path
          className="text-blue-500 hover:text-blue-700 transition">
          Find Buyers
        </Link>
        <Link
          to="find-comparables" // Correct relative path
          className="text-blue-500 hover:text-blue-700 transition">
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
