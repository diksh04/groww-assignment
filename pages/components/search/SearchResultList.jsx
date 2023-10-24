import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results }) => {
  // console.log(results);
  //   console.log("hello");
  const [items, setItems] = useState(null);
  const stockHandler = (type) => {
    console.log(type);
    if (type === "all") {
      setItems(results);
    } else if (type === "stocks") {
      const temp = results.filter((item) => {
        return item["3. type"] === "Equity";
      });
      console.log(temp);
      setItems(temp);
    }
    else if(type === "etfs"){
      const temp = results.filter((item) => {
        return item["3. type"] === "ETF";
      });
      console.log(temp);  
      setItems(temp);
    }
    
  };
  useEffect(() => {
    setItems(results);
  }, [results]);
  return (
    <div className="results-list absolute z-50 border-amber-700 border-2 md:w-[450px]">
      <div className=" px-4 py-2 text-white bg-amber-700 rounded-lg  border-2 font-bold">
        Searched Results....
        <div className="flex gap-3">
          <span
            className="border-white border-2 px-2 rounded-lg"
            onClick={() => stockHandler("all")}
          >
            All
          </span>
          <span
            className="border-white border-2 px-2 rounded-lg"
            onClick={() => stockHandler("stocks")}
          >
            Stocks
          </span>
          <span
            className="border-white border-2 px-2 rounded-lg"
            onClick={() => stockHandler("etfs")}
          >
            Etfs
          </span>
        </div>
      </div>
      {items &&
        items.map((result) => {
          // console.log(result["2. name"]);
          return (
            <SearchResult
              name={result["2. name"]}
              symbol={result["1. symbol"]}
              key={result["1. symbol"]}
            />
          );
        })}
      {!items && <p className="bg-red-600">No Searched Result found....</p>}
    </div>
  );
};

export default SearchResultsList;
