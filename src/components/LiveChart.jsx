import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { csvParse } from "d3-dsv";
import OHLCChart from "./OHLCChart";

let socket;
const LiveChart = () => {
  const [value, setValue] = useState([]);
  const [data, setData] = useState();

  const ENDPOINT = "http://kaboom.rksv.net/watch";

  useEffect(() => {
    socket = io(ENDPOINT, {
      extraHeaders: {
        "Accept-­Encoding": "gzip",
      },
    });

    socket.emit("sub", { state: true });

    socket.on("data", (data, callback) => {
      let str = "timestamp,open,high,low,close,volume";
      value.push(data);
      setValue(value);
      const csvData = str + "\n" + value.join("\n");
      const historicalData = csvParse(csvData);
      setData(historicalData);

      callback(1);
    });

    return () => {
      socket.emit("unsub", { state: false });
      socket.off();
    };
  }, [data]);
  return (
    <div className="home-container">
      <h1>Live Charts</h1>
      {value.length > 5 ? (
        <div className="chart-container">
          <OHLCChart data={data} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LiveChart;
