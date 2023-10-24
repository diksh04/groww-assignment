import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { httpWrapper } from "@/pages/utils/http";
// 9L3KOTE41H6TZS5Z
// 0AMS86IZ4NS5Y1D6
const SearchBar = ({ setResults }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (search) => {
      // try {
      //   const response = await fetch(
      //     `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=9L3KOTE41H6TZS5Z`
      //   );
      //   const data = await response.json();
      //   console.log(data);
      //   // alert(data.Information);
      //   setResults(data.bestMatches);
      // } catch (err) {
      //   console.log("an error ocurred");
      // }
      // const data = await httpWrapper.get("/query", {
      //   "function": "SYMBOL_SEARCH",
      //   "keywords": search,
      // });
      // if (data) {
      //   setResults(data.bestMatches);
      // } else {
      //   setError("Error in fetching data");
      // }
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
