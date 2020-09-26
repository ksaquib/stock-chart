import React, { useEffect, useState } from "react";
import axios from "axios";
import { csvParse } from "d3-dsv";
import OHLCChart from "./OHLCChart";

const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
    return () => {
      console.log("bye home");
    };
  }, []);
  const getData = async () => {
    try {
      const res = await axios.get(
        "http://kaboom.rksv.net/api/historical?interval=3"
      );
      let str = "x,y";
      let data = res.data;
      historicalData = arr.map((val) => {
        splittedArr = val.split(",");
        const [timestamp, ...remainingVal] = splittedArr;
        return {
          x: timestamp,
          y: remainingVal,
        };
      });
      setData(historicalData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="home-container">
      <h1>Historical Data</h1>
      <div className="chart-container">
        {data ? <OHLCChart data={data} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
