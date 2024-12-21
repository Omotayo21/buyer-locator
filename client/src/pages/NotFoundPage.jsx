// NotFoundPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
      <div className="text-center bg-blue-50 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="text-blue-600 mb-6">
          <svg
            className="w-24 h-24 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="32" cy="32" r="30" />
            <line x1="22" y1="22" x2="42" y2="42" />
            <line x1="42" y1="22" x2="22" y2="42" />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 justify-center"
        >
          <IoMdArrowBack size={20} />
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;


