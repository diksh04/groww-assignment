import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=INTEW`;
const apikey = `&apikey=Z20J90M1VL4K00HF`;
const Product = () => {
  const router = useRouter();

  console.log(router);
  const [items, setItems] = useState([]);
  async function handleFetchData() {
    try {
      const response = await fetch(`${url}${apikey}`);
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
    handleFetchData();
  }, []);
  return (
    <div className="mt-12 mx-20  ">
      <div className="flex align-middle border-2 rounded-lg  p-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxlM-1K1dcgTQYpKofggmTNJwZgWIbt7okzaCeVtYJf_moof0eJTF49mio-n5Fmc_itZw&usqp=CAU/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill"
          className="w-[10%] p-4  flex justify-center align-middle mr-10"
        />
        <div className="w-[60%] mt-4 mr-10 p-3">
          <div className="font-bold">{items.Name}</div>
          <div>{`${items.Symbol}, ${items.AssetType}`}</div>
          <div>{items.Exchange}</div>
        </div>
        <div className=" w-[30%] mt-4 p-3 align-middle justify-center">
          <div className="font-bold">$179.8</div>
          <div>0.41%</div>
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
        <div className="mt-3  text-lg">{items.Description}</div>

        {/* industry & sector */}
        <div className=" my-6 flex  align-middle justify-center">
          <div className=" p-4 mr-10 rounded-3xl text-base text-white bg-amber-800 ">
            INDUSTRY: {items.Industry}
          </div>
          <div className="p-4 mr-10 rounded-3xl text-white  text-base bg-amber-800 ">
            SECTOR: {items.Sector}
          </div>
        </div>

        {/* other details */}
        <div className=" flex mb-14">
          <div className="mr-10 w-[15%]">
            <div>52 week low</div>
            <div className="font-bold">${items["52WeekLow"]}</div>
          </div>
          <div className="flex flex-col text-center justify-between w-[70%]">
            <div>Current price: $173.21</div>
            <div className="flex justify-center">
              <BiSolidDownArrow />
            </div>
            <div className="border-b-4"></div>
          </div>
          <div className="ml-10">
            <div>52 week high</div>
            <div className="font-bold">${items["52WeekHigh"]}</div>
          </div>
        </div>

        {/* market cap sectoon */}
        <div className=" flex justify-evenly">
          <div>
            <div>Market Cap</div>
            <div className="text-center font-bold">
              {items.MarketCapitalization > 0
                ? `$${items.MarketCapitalization}`
                : "null"}
            </div>
          </div>
          <div>
            <div>P/E Ratio</div>
            <div className="text-center font-bold">{items.PERatio}</div>
          </div>
          <div>
            <div>Beta</div>
            <div className="text-center font-bold">{items.Beta}</div>
          </div>
          <div>
            <div>Dividend Yield</div>
            <div className="text-center font-bold">{items.DividendYield}%</div>
          </div>
          <div>
            <div>Profit Margin</div>
            <div className="text-center font-bold">{items.ProfitMargin}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
