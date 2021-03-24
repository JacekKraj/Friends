import React from "react";

import classes from "./discoverBar.module.scss";
import SmallScreenNav from "./smallScreenDiscoverBar/SmallScreenDiscoverBar";
import BigScreenNav from "./bigScreenDiscoverBar/BigScreenDiscoverBar";

const DiscoverBar = (props) => {
  return (
    <div className={classes.discoverBarComponent}>
      <div className={classes.smallScreenNavContainer}>
        <SmallScreenNav>{props.children}</SmallScreenNav>
      </div>
      <div className={classes.bigScreenNavContainer}>
        <BigScreenNav>{props.children}</BigScreenNav>
      </div>
    </div>
  );
};

export default DiscoverBar;
