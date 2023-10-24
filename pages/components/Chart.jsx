import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { httpWrapper } from "../../lib/http";

const TimeLine = ["1D", "1W", "1M", "3M", "6M", "1Y"];

const Chart = ({ ticker }) => {
  console.log(ticker);

  const [priceVariationList, setPriceVariationList] = useState([]);
  const [timeline, setTimeline] = useState("1D");
  const [templist, setTemplist] = useState([]);
  const [loadState, setLoadState] = useState("Loading");

  useEffect(() => {
    if (timeline === "1D") {
      const temp = [];
      Object.keys(templist).forEach((key) => {
        const tempObj = {};
        tempObj["time"] = key.split(" ")[1].slice(0, 5);
        tempObj["value"] = templist[key]["4. close"];
        temp.push(tempObj);
      });
      setPriceVariationList(temp);
    } else {
      const temp = [];
      Object.keys(templist).forEach((key) => {
        const tempObj = {};
        tempObj["time"] = key;
        tempObj["value"] = templist[key]["4. close"];
        temp.push(tempObj);
      });
      let deduct = 0;
      if (timeline === "1W") {
        deduct = 518400000;
      } else if (timeline === "1M") {
        deduct = 2505600000;
      } else if (timeline === "3M") {
        deduct = 7689600000;
      } else if (timeline == "6M") {
        deduct = 15465600000;
      } else if (timeline == "1Y") {
        deduct = 31449600000;
      }
      let d = Date.parse(temp[0]["time"]);
      let s = d;
      let e = d - deduct;
      let i = 0,
        j = 0;
      const finalTemp = [];
      while (s >= e) {
        let d1 = Date.parse(temp[j]["time"]);
        if (d1 == s) {
          finalTemp.push(temp[j]);
          j++;
        }
        i++;
        s = d - 86400000 * i;
      }
      setPriceVariationList(finalTemp);
    }
  }, [templist]);

  const fetchInitialList = async () => {
    if (timeline === "1D") {
      // httpWrapper.get("/query", {
      //   function: "TIME_SERIES_INTRADAY",
      //   symbol: ticker,
      //   interval: "5min",
      // });

      // if (data["Time Series (5min)"]) {
      //   setTemplist(data["Time Series (5min)"]);
      // } else {
      //   setLoadState("Error in fetching data");
      // }
      httpWrapper
        .get("/query", {
          function: "TIME_SERIES_INTRADAY",
          symbol: ticker,
          interval: "5min",
        })
        .then((data) => {
          if (data["Time Series (5min)"]) {
            setTemplist(data["Time Series (5min)"]);
          }
        })
        .catch((err) => {
          setLoadState("Error in fetching data");
        });
    } else {
      // const data = await httpWrapper.get("/query", {
      //   function: "TIME_SERIES_DAILY",
      //   symbol: ticker,
      //   outputsize: "full",
      // });

      // if (data["Time Series (Daily)"]) {
      //   setTemplist(data["Time Series (Daily)"]);
      // } else {
      //   setLoadState("Error in fetching data");
      // }
      httpWrapper
        .get("/query", {
          function: "TIME_SERIES_DAILY",
          symbol: ticker,
          outputsize: "full",
        })
        .then((data) => {
          if (data["Time Series (Daily)"]) {
            setTemplist(data["Time Series (Daily)"]);
          }
        })
        .catch((err) => {
          setLoadState("Error in fetching data");
        });
    }
  };

  useEffect(() => {
    setLoadState("Success");
  }, [priceVariationList]);

  useEffect(() => {
    setLoadState("Loading");
    fetchInitialList();
  }, [timeline]);

  return (
    <div className=" mt-4 mx-auto flex flex-col items-center gap-2 ">
      {loadState == "Loading" && (
        <div className="text-black text-center font-semibold text-[20px] mt-4">
          Loading Graphical data.
        </div>
      )}
      {loadState == "Success" && (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={priceVariationList}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                padding={{ left: 10 }}
                angle={-45}
                minTickGap={10}
                height={50}
                reversed
                dataKey="time"
              />
              <YAxis domain={["dataMin-1", "dataMax+1"]} />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-2">
            {TimeLine.map((time, idx) => (
              <div
                className="py-2 px-4 bg-amber-700 rounded-full cursor-pointer"
                key={idx}
                onClick={() => {
                  setTimeline(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      )}
      {loadState == "Error" && (
        <div className="text-black text-center font-semibold text-[20px] mt-4">
          Error Occured.try after sometime!
        </div>
      )}
    </div>
  );
};

export default Chart;
