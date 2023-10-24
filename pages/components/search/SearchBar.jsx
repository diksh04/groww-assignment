import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { httpWrapper } from "@/lib/http";
const SearchBar = ({ setResults }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (search) => {
      httpWrapper
        .get("/query", {
          function: "SYMBOL_SEARCH",
          keywords: search,
        })
        .then((data) => {
          setResults(data.bestMatches);
        })
        .catch((err) => {
          setError("Error in fetching data");
        });
    },
    [setResults]
  );
  const changeHandler = (e) => {
    setSearch(e);
  };
  useEffect(() => {
    let timeId = setTimeout(() => {
      fetchData(search);
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [search, fetchData]);
  return (
    <div className="input-wrapper md:w-[450px]">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search stocks & etfs"
        value={search}
        onChange={(e) => changeHandler(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
