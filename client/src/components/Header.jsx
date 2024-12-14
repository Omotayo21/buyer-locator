import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    <div className="h-[70px]  bg-gray-40  py-3  w-full px-6   text flex gap-2 items-center justify-between">
      <div className="w-full flex gap-4 h-full items-center py-1">
        <div className="flex items-center gap-4">
          <img
            src="/assets/ai.webp"
            className="w-full h-auto  max-w-[50px] object-cover rounded-lg shadow-md"
            alt="Image description"
          />
          <h1 className="font-bold text-2xl hidden sm:block">SocialPost Pro</h1>
        </div>
        <div
          className={` gap-3 h-full items-end ${
            location.pathname === "/login" || location.pathname === "/register"
              ? "hidden"
              : "flex"
          }`}>
          <Link
            to="/locate-buyer/find-buyers"
            className={` font-medium font-mono ${
              location.pathname.startsWith("/locate-buyer")
                ? " pb-2 text-[#4608AD] border-b-[#4608AD] border-b-4  text-[#4608AD"
                : "pb-1  text-gray-500"
            }`}>
            Buyer Locator and Comps
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        {/* Avatar Section */}
        {localStorage.getItem("token") && (
          <div className="relative">
            <img
              src="/assets/profile.webp" // Use your avatar image URL here
              alt="Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
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
