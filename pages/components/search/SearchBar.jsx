import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
// 9L3KOTE41H6TZS5Z
const SearchBar = ({ setResults }) => {
  const [search, setSearch] = useState("");
  // const [items,setItems] = useState([]);
  async function fetchData(search) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=9L3KOTE41H6TZS5Z`
    );
    const data = await response.json();
    // console.log(data);
    setResults(data.bestMatches);
  }
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
  }, [search]);
  return (
    // <div style={{ position: "relative" }} className="flex" >
    //   <input
    //     type="text"
    //     placeholder="Search stocks & etfs"
    //     name="text"
    //     className="searchbar text-black"
    //     onChange={changeHanlder}
    //     value={search}
    //     style={{
    //       width: "450px",
    //       padding: "10px 0px 10px 40px",
    //       borderRadius: "9999px",
    //       border: "solid 1px #333",
    //       transition: "all .2s ease-in-out",
    //       outline: "none",
    //       opacity: 0.9,
    //     }}
    //   />
    //   <svg
    //     fill="#000000"
    //     width="20px"
    //     height="20px"
    //     viewBox="0 0 1920 1920"
    //     xmlns="http://www.w3.org/2000/svg"
    //     style={{
    //       position: "absolute",
    //       top: "50%",
    //       left: "10px",
    //       transform: "translate(0, -50%)",
    //     }}
    //   >
    //     <path
    //       d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
    //       fillRule="evenodd"
    //     />
    //   </svg>
    // </div>
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
