"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BiSolidDownArrow } from "react-icons/bi";
// import { httpWrapper } from "../../lib/http";
import { httpWrapper } from "../../lib/http";
import NavBar from "../components/NavBar";
import Chart from "../components/Chart";

const Slug = () => {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  async function handleFetchData(companyName) {
    
    httpWrapper
      .get("/query", {
        function: "OVERVIEW",
        symbol: companyName,
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        setError("Error in fetching data");
      });
  }

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.slug);
      setName(router.query.slug);
      handleFetchData(router.query.slug);
    }
  }, [router.isReady, router.query.slug]);

  const currentPrice = (+items["52WeekLow"] + +items["52WeekHigh"]) / 2;
  // console.log(currentPrice);

  return (
    <div>
      <NavBar />
          <div className=" flex flex-col items-center  align-middle justify-center  rounded-lg  p-3">
            <div className=" mt-4 w-full p-3">
              <div className="font-bold text-2xl">{items.name}</div>
              <div>{`${items.Symbol ? items.Symbol : "not known"}, ${
                items.AssetType ? items.AssetType : "not known"
              }`}</div>
              <div>{items.Exchange}</div>
            </div>
            <div className="p-3 md:start w-full">
              <div className="font-bold">{items.Address}</div>
              <div>Country: {items.Country}</div>
            </div>
          </div>

          {/* second box */}
          <Chart ticker={name} />

          {/* third box */}
          <div className="my-8 px-8 border-2 m-4 rounded-lg py-3">
            {/* about section */}
            <div className=" rounded-lg">
              <div className="py-2 border-b-2 font-bold text-xl">
                About {items.Name}
              </div>
            </div>

            {/* description */}
            <div className="mt-3  text-lg mb-5">
              {items.Description ? items.Description : "not known"}
            </div>

            {/* industry & sector */}
            <div className="flex flex-col align-middle justify-center gap-4 md:flex-row md:justify-evenly mb-5 ">
              <div className=" p-4 text-center rounded-3xl text-base text-white bg-amber-800  ">
                INDUSTRY: {items.Industry ? items.Industry : "not known"}
              </div>
              <div className="p-4 text-center rounded-3xl text-white  text-base bg-amber-800  ">
                SECTOR: {items.Sector ? items.Sector : "not known"}
              </div>
            </div>

            {/* other details */}
            <div className=" flex mb-4 flex-col gap-4 md:flex-row md:justify-around">
              <div className="flex justify-center flex-col items-center">
                <div>52 week low</div>
                <div className="font-bold">
                  {items["52WeekLow"] ? `$${items["52WeekLow"]}` : "not known"}
                </div>
              </div>

              <div className="flex flex-col text-center justify-between md:w-[60%] ">
                <div>
                  Current price:{" "}
                  {currentPrice >= 0 ? `$${currentPrice}` : "not known"}
                </div>
                <div className="flex justify-center">
                  <BiSolidDownArrow />
                </div>
                <div className="border-b-4"></div>
              </div>
              <div className="flex justify-center flex-col items-center">
                <div>52 week high</div>
                <div className="font-bold">
                  {items["52WeekHigh"]
                    ? `$${items["52WeekHigh"]}`
                    : "not known"}
                </div>
              </div>
            </div>

            {/* market cap sectoon */}
            <div className=" flex flex-col gap-4 items-center md:flex-row md:justify-evenly">
              <div>
                <div>Market Cap</div>
                <div className="text-center font-bold">
                  {items.MarketCapitalization > 0
                    ? `$${items.MarketCapitalization}`
                    : "not known"}
                </div>
              </div>
              <div>
                <div>P/E Ratio</div>
                <div className="text-center font-bold">
                  {items.PERatio ? items.PERatio : "not known"}
                </div>
              </div>
              <div>
                <div>Beta</div>
                <div className="text-center font-bold">
                  {items.Beta ? items.Beta : "not known"}
                </div>
              </div>
              <div>
                <div>Dividend Yield</div>
                <div className="text-center font-bold">
                  {items.DividendYield
                    ? `${items.DividendYield}%`
                    : "not known"}
                </div>
              </div>
              <div>
                <div>Profit Margin</div>
                <div className="text-center font-bold">
                  {items.ProfitMargin ? `${items.ProfitMargin}` : "not known"}
                </div>
              </div>
            </div>
          </div>
      {error && <div className="text-red-500  items-center flex text-center"></div>}
    </div>
  );
};

export default Slug;
