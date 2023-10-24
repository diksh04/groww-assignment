import React, { useState } from "react";
// import SearchBar from "./search/SearchBar";
import Search from "./search/Search";
import { AiOutlineStock } from "react-icons/ai";
import Link from "next/link";
const NavBar = (props) => {

  return (
    <div
      className={`flex flex-col items-center  w-full flex-wrap bg-amber-900 p-4 gap-4 md:flex-row md:justify-between`}
    >
      <nav className=" px-4  flex justify-start ">
        <div className="text-3xl font-bold sm:text-3xl text-white ">
          <Link href="/">
            <div className="flex gap-2 items-center">
              <span>GrowwStonks</span>
              <span>
                <AiOutlineStock />
              </span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="flex justify-center">
        <Search />
      </div>
    </div>
  );
};

export default NavBar;
