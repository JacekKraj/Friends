import React from "react";

import classes from "./home.module.scss";
import MainContent from "./mainContent/MainContent";
import DiscoverBar from "./../discoverBar/DiscoverBar";
import SideNav from "./../sideNav/SideNav";
import DiscoverFriends from "./../discoverBar/discoverFriends/DiscoverFriends";
import DiscoverChat from "./../discoverBar/discoverChat/DiscoverChat";

const Home = () => {
  return (
    <div className={classes.homeComponent}>
      <SideNav />
      <MainContent />
      <DiscoverBar>
        <DiscoverFriends type="home" />
        <DiscoverChat />
      </DiscoverBar>
    </div>
  );
};

export default Home;
