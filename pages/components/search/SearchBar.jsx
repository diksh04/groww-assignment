import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
// 9L3KOTE41H6TZS5Z
const SearchBar = ({ setResults }) => {
  const [search, setSearch] = useState("");
  // const [items,setItems] = useState([]);
  async function fetchData() {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=9L3KOTE41H6TZS5Z`
    );
    const data = await response.json();
    console.log(data);
    setResults(data.bestMatches);
  }
  const changeHandler = (e) => {
    // console.log(e);
    setSearch(e);
  };
  useEffect(() => {
    let timeId = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [search]);
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
