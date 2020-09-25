import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("Hello home");
    return () => {
      console.log("bye home");
    };
  });
  return <div>Home</div>;
};

export default Home;
