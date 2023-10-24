"use client";
import Link from "next/link";
import React from "react";
const SearchResult = ({ name, symbol }) => {
  console.log(name);

  return (
    <Link href={`/product/${symbol}`}>
      <div className="search-result">
        <div className="font-bold text-base">{name}</div>
        <p className="text-[14px]">{symbol}</p>
      </div>
    </Link>
  );
};

export default SearchResult;
