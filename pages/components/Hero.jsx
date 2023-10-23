import React, { useEffect, useState } from "react";
import Card from "./Card";

const IMAGES = [
  {
    id: "1",
    imageURL:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill",
  },
  {
    id: "2",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxlM-1K1dcgTQYpKofggmTNJwZgWIbt7okzaCeVtYJf_moof0eJTF49mio-n5Fmc_itZw&usqp=CAU/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill",
  },
  {
    id: "3",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzPFGyg8JCSEJwPbZmGPbAjkvmaK6DMrxPg&usqp=CAU/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill",
  },
  {
    id: "4",
    imageURL:
      "https://i.insider.com/50f03e2deab8ea9d42000027?width=1000&format=jpeg&auto=webp/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill",
  },
  {
    id: "5",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfce1lhHVOKswJHGzhqeD32GkXTDqwt_LWSg&usqp=CAU/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill",
  },
  {
    id: "6",
    imageURL:
      "https://i.insider.com/50f03dfbecad04e45100000e?width=600&format=jpeg&auto=webp/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill",
  },
  {
    id: "7",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkfll0JXnVTfVnX4qwrwh0tSFRA4K6dZbBVA&usqp=CAU/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill",
  },
  {
    id: "8",
    imageURL:
      "https://logovtor.com/wp-content/uploads/2021/03/grow-com-logo-vector.png",
  },
];
const url =
  "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo";
  const apikey = "9L3KOTE41H6TZS5Z";

const Hero = () => {
  const [items, setItems] = useState([]);
  const [apiTosShow, setApiToShow] = useState("top_gainers");
  const [color, setColor] = useState(false);

  const handleTopGainData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("status", response.status);
      }
      const data = await response.json();
      console.log(data);
      setItems(data.top_gainers);
      setApiToShow("top_gainers");
    } catch (error) {
      await handleFetchData();
    }
  };
  const handleTopLoserData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("status", response.status);
      }
      const data = await response.json();
      console.log(data);
      setItems(data.top_losers);
      setApiToShow("top_losers");
    } catch (error) {
      await handleFetchData();
    }
  };

  useEffect(() => {
    handleTopGainData();
  }, []);

  const showTopGainerHandler = () => {
    handleTopGainData();
  };
  const showTopLoserHandler = () => {
    handleTopLoserData();
  };
  return (
    <div className="mt-20 absolute top-0 z-0">
      <div className="ml-20  ">
        <button
          className={`mr-4 p-3 text-lg border-2 font-bold bg-amber-800 hover:bg-amber-600 text-white border-none rounded-lg`}
          onClick={showTopGainerHandler}
        >
          Top Gainers
        </button>
        <button
          className={`p-3 text-lg border-2 font-bold bg-amber-800 hover:bg-amber-600 text-white border-none rounded-lg`}
          onClick={showTopLoserHandler}
        >
          Top Losers
        </button>
      </div>

      <div className="flex mt-10 justify-center  flex-wrap">
        {apiTosShow === "top_gainers" &&
          items?.length > 0 &&
          items.map((item, idx) => {
            return (
              <Card
                key={idx}
                image={IMAGES[ idx % IMAGES.length].imageURL}
                title={item.ticker}
                shareprice={item.price}
                shareIncDec={item.change_amount}
              />
            );
          })}
        {apiTosShow === "top_losers" &&
          items?.length > 0 &&
          items.map((item, idx) => {
            return (
              <Card
                key={idx}
                image={IMAGES[idx % IMAGES.length].imageURL}
                title={item.ticker}
                shareprice={item.price}
                shareIncDec={item.change_amount}
              />
            );
          })}
      </div>
    
    </div>
    
  );
};

export default Hero;
