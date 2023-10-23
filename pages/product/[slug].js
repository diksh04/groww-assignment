"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BiSolidDownArrow } from "react-icons/bi";
import NavBar from "../components/NavBar";
import Image from "next/image";
const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=`;
const apikey = `&apikey=9L3KOTE41H6TZS5Z`;
const Slug = () => {
  const router = useRouter();
  //   const companyName = router.query.slug;
  //   console.log(companyName);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  async function handleFetchData(companyName) {
    try {
      const response = await fetch(`${url}${companyName}${apikey}`);
      if (!response.ok) {
        console.log("status", response.status);
      }
      const data = await response.json();
      console.log(data);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    //     handleFetchData();
    if (router.isReady) {
      console.log(router.query.slug);
      setName(router.query.slug);
      handleFetchData(router.query.slug);
    }
  }, [router.isReady, router.query.slug]);
  const currentPrice = (+items["52WeekLow"] + +items["52WeekHigh"]) / 2;
  console.log(currentPrice);
  return (
    <div>
      <NavBar />
      <div className="mt-12 mx-20  ">
        <div className="flex align-middle border-2 rounded-lg  p-3">
          <Image
            loader={() =>
              "https://logovtor.com/wp-content/uploads/2021/03/grow-com-logo-vector.png"
            }
            src="https://logovtor.com/wp-content/uploads/2021/03/grow-com-logo-vector.png"
            className="w-[13%]  p-4  flex justify-center align-middle mr-10"
            width={300}
            height={300}
            alt="grow_logo"
          />
          <div className="w-[60%] mt-4 mr-10 p-3">
            <div className="font-bold">{name}</div>
            <div>{`${items.Symbol ? items.Symbol : "not known"}, ${
              items.AssetType ? items.AssetType : "not known"
            }`}</div>
            <div>{items.Exchange}</div>
          </div>
          <div className=" w-[30%] mt-4 p-3 align-middle justify-center">
            <div className="font-bold">{items.Address}</div>
            <div>Country: {items.Country}</div>
          </div>
        </div>

        {/* second box */}
        <div className="my-8 px-8 border-2 rounded-lg py-3">
          {/* about section */}
          <div className=" rounded-lg">
            <div className="py-2 border-b-2 font-bold text-xl">
              About {items.Name}
            </div>
          </div>

          {/* description */}
          <div className="mt-3  text-lg">
            {items.Description ? items.Description : "not known"}
          </div>

          {/* industry & sector */}
          <div className=" my-6 flex  align-middle justify-center">
            <div className=" p-4 mr-10 rounded-3xl text-base text-white bg-amber-800 ">
              INDUSTRY: {items.Industry ? items.Industry : "not known"}
            </div>
            <div className="p-4 mr-10 rounded-3xl text-white  text-base bg-amber-800 ">
              SECTOR: {items.Sector ? items.Sector : "not known"}
            </div>
          </div>

          {/* other details */}
          <div className=" flex mb-14">
            <div className="mr-10 w-[15%]">
              <div>52 week low</div>
              <div className="font-bold">
                {items["52WeekLow"] ? `$${items["52WeekLow"]}` : "not known"}
              </div>
            </div>
            <div className="flex flex-col text-center justify-between w-[70%]">
              <div>
                Current price:{" "}
                {currentPrice >= 0 ? `$${currentPrice}` : "not known"}
              </div>
              <div className="flex justify-center">
                <BiSolidDownArrow />
              </div>
              <div className="border-b-4"></div>
            </div>
            <div className="ml-10">
              <div>52 week high</div>
              <div className="font-bold">
                {items["52WeekHigh"] ? `$${items["52WeekHigh"]}` : "not known"}
              </div>
            </div>
          </div>

          {/* market cap sectoon */}
          <div className=" flex justify-evenly">
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
                {items.DividendYield ? `${items.DividendYield}%` : "not known"}
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
      </div>
    </div>
  );
};

export default Slug;
