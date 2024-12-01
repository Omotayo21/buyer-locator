import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  const location = useLocation();
  return (
    <div className="h-[50px] border-y-2  w-full px-6   text flex gap-2 items-center justify-between">
      <div className="w-full flex gap-4 h-full items-center py-1">
        <h1 className="font-bold text-2xl">SocialPost Pro</h1>
        <div className="flex gap-3 h-full   items-end">
          <Link
            to="/locate-buyer/find-buyers"
            className={` font-medium font-mono ${
              location.pathname.startsWith("/locate-buyer") 
                ? " pb-2 text-[#4608AD] border-b-[#4608AD] border-b-4  text-[#4608AD"
                : "pb-3  text-gray-500"
            }`}>
            Buyer Locator
          </Link>
          <Link
            to="/locate"
            className={` font-medium font-mono ${
              location.pathname === "/locate"
                ? " pb-2 text-[#4608AD] border-b-[#4608AD] border-b-4  text-[#4608AD"
                : "pb-3  text-gray-500"
            }`}>
            Poster Poster
          </Link>
          <Link
            to="/buyer"
            className={` font-medium font-mono ${
              location.pathname === "/buyer"
                ? " pb-2 text-[#4608AD] border-b-[#4608AD] border-b-4  text-[#4608AD"
                : "pb-3  text-gray-500"
            }`}>
            Facebook Scrapper
          </Link>

          {/* <Link>Buyer Locator</Link>
        <Link>Buyer Locator</Link> */}
        </div>
      </div>
      <div className="flex ">
        <AiFillSetting size={20} />
        <IoIosNotifications size={20} />
      </div>
    </div>
  );
};

export default Header;
