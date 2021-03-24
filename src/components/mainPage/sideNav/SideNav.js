import React from "react";

import classes from "./sideNav.module.scss";
import SmallScreenNav from "./smallScreenNav/SmallScreenNav";
import BigScreenNav from "./bigScreenNav/BigScreenNav";

const SideNav = (props) => {
  return (
    <React.Fragment>
      <div className={classes.smallScreenNavContainer}>
        <SmallScreenNav />
      </div>
      <div className={classes.bigScreenNavContainer}>
        <BigScreenNav />
      </div>
    </React.Fragment>
  );
};

export default SideNav;
