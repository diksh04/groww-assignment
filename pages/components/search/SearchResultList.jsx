import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  //   console.log(results);
  //   console.log("hello");
  return (
    <div className="results-list absolute z-50 border-amber-700 border-2 ">
      <div className=" px-4 py-2 text-white bg-amber-700 rounded-lg  border-2 font-bold">
        Searched Results....
      </div>
      {results.map((result) => {
        console.log(result["2. name"]);
        return (
          <SearchResult
            name={result["2. name"]}
            symbol={result["1. symbol"]}
            key={result.symbol}
          />
        );
      })}
    </div>
  );
};
