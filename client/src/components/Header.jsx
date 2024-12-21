import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isChristmas } from "../utils";

const Header = ({ setComps }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const handleAvatarClick = () => {
    setShowLogout(!showLogout); // Toggle the visibility of the logout button
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("acqPrice");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("arvPer");
    setComps([]);
    setShowLogout(false);
    navigate("/login");
  };
  return (
    <div className="sticky top-0 z-50 h-[70px] bg-gray-40 py-3 w-full px-6 flex gap-2 items-center justify-between shadow-md">
      <div className="w-full flex gap-4 h-full items-center py-1">
        <Link to="/" className="flex items-center gap-4 w-fit">
          {isChristmas && (
            <img
              loading="lazy"
              src="/assets/xmasleft.png"
              className="w-full h-auto max-w-[50px] object-cover rounded-lg absolute top-0 left-0"
              alt="Image description"
            />
          )}
          <img
            loading="lazy"
            src="/assets/ai.webp"
            className="sm:w-[50px] w-[80px] h-auto max-w-[50px] object-cover rounded-lg shadow-md"
            alt="Image description"
          />


          <h1 className="font-bold w-full font-serif sm:text-2xl sm:block">
            SocialPost Pro
          </h1>
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen">
        {/* Avatar Section */}
        {localStorage.getItem("token") && (
          <div className="relative">
            <img
              loading="lazy"
              src="/assets/profile.webp" // Use your avatar image URL here
              alt="Avatar"
              className="w-12 sm:w-10 h-10 rounded-full cursor-pointer"
              onClick={handleAvatarClick}
            />

            {/* Conditionally render the logout button below the avatar */}
            {showLogout && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md p-2">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
