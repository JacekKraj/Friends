import React from "react";

import classes from "./mainPage.module.scss";
import SmallScreenNavBar from "./navBar/smallScreenNavBar/SmallScreenNavBar";
import BigScreenNavBar from "./navBar/bigScreenNavBar/BigScreenNavBar";
import MainContent from "./mainContent/MainContent";
import DiscoverBar from "./discoverBar/DiscoverBar";
const MainPage = () => {
  return (
    <div className={classes.mainPageComponent}>
      <div className={classes.smallScreenNavBarContainer}>
        <SmallScreenNavBar />
      </div>
      <div className={classes.bigScreenNavBarContainer}>
        <BigScreenNavBar />
      </div>
      <div className={classes.mainContentContainer}>
        <MainContent />
        <DiscoverBar />
      </div>
    </div>
  );
};

export default MainPage;
