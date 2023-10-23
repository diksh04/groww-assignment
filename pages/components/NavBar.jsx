import React from "react";
// import SearchBar from "./search/SearchBar";
import Search from "./search/Search";
import Link from "next/link";
const NavBar = () => {
  return (
    <div>
      <div className="bg-amber-900 h-15 p-4  z-0">
        <nav className="container px-4 mx-auto flex items-center justify-between ">
          <div className="text-3xl font-bold sm:text-3xl text-white">
            <Link href="/">GrowwStonks</Link>
          </div>
        </nav>
      </div>
      <div className="z-20 flex justify-end mt-[-55px] mr-10">
        <Search />
      </div>
    </div>
  );
};

export default NavBar;
