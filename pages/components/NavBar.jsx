import React from "react";
// import SearchBar from "./search/SearchBar";
import Search from "./search/Search";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="flex flex-col items-center  w-full flex-wrap bg-amber-900 p-4 gap-4 md:flex-row md:justify-between  ">
      <nav className=" px-4  flex justify-start ">
        <div className="text-3xl font-bold sm:text-3xl text-white">
          <Link href="/">GrowwStonks</Link>
        </div>
      </nav>

      <div className="flex justify-center">
        <Search />
      </div>
    </div>
  );
};

export default NavBar;
