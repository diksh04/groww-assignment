import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
// 9L3KOTE41H6TZS5Z
const SearchBar = ({ setResults }) => {
  const [search, setSearch] = useState("");
  // const [items,setItems] = useState([]);

  const fetchData = useCallback(async (search) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=9L3KOTE41H6TZS5Z`
      );
      const data = await response.json();
      console.log(data);
      setResults(data.bestMatches);
    } catch (err) {
      console.log("an error ocurred");
    }
  }, [setResults]);
  const changeHandler = (e) => {
    // console.log(e);
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
    <div className="input-wrapper z-50 mb-5">
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
