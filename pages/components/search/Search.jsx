"use client";
import React from "react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { SearchResultsList } from "./SearchResultList";
const Search = () => {
  const [results, setResults] = useState([]);

  return (
    <div>

      <SearchBar setResults={setResults}/>
      {results && <SearchResultsList results={results} />}
    </div>
  );
};

export default Search;
