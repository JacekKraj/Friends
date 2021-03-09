import React, { useState } from "react";

import classes from "./home.module.scss";

import MainContent from "./mainContent/MainContent";
import DiscoverBar from "./discoverBar/DiscoverBar";
import SideNav from "./../sideNav/SideNav";

const Home = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className={classes.mainPageComponent}>
      <SideNav show={showNav} setShow={setShowNav} />
      <MainContent setShowNav={setShowNav} />
      <DiscoverBar />
    </div>
  );
};

export default Home;
