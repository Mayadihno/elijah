import React from "react";
import Banner from "../components/Banner/Banner";
import Channel from "../components/Channel/Channel";
import News from "../components/News/News";
import Sport from "../components/Sport/Sport";
import Partner from "../components/Sport/Partner";

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <Channel />
      <News />
      <Sport />
      <Partner />
    </React.Fragment>
  );
};

export default Home;
