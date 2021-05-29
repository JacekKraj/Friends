import React from "react";

import classes from "./discoverBar.module.scss";
import SmallScreenDiscoverBar from "./smallScreenDiscoverBar/SmallScreenDiscoverBar";
import BigScreenDiscoverBar from "./bigScreenDiscoverBar/BigScreenDiscoverBar";

const DiscoverBar = (props) => {
  return (
    <div className={classes.discoverBarComponent}>
      <div className={classes.smallScreenNavContainer}>
        <SmallScreenDiscoverBar>{props.children}</SmallScreenDiscoverBar>
      </div>
      <div className={classes.bigScreenNavContainer}>
        <BigScreenDiscoverBar>{props.children}</BigScreenDiscoverBar>
      </div>
    </div>
  );
};

export default DiscoverBar;
