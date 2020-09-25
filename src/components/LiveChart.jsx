import React, { useEffect } from "react";

const LiveChart = () => {
  useEffect(() => {
    console.log("Hello live");
    return () => {
      console.log("bye live");
    };
  });
  return <div>Live Chart</div>;
};

export default LiveChart;
