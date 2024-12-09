import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="h-[70px] border-y- py-4  w-full px-6   text flex gap-2 items-center justify-between">
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
            location.pathname === "/login" || location.pathname==="/signup" ? "hidden" : "flex"
          }`}>
          <Link
            to="/locate-buyer/find-buyers"
            className={` font-medium font-mono ${
              location.pathname.startsWith("/locate-buyer")
                ? " pb- text-[#4608AD] border-b-[#4608AD] border-b-4  text-[#4608AD"
                : "pb-1  text-gray-500"
            }`}>
            Buyer Locator and Comps
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
