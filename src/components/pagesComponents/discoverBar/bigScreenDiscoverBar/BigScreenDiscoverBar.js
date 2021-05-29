import React from "react";

import classes from "./bigScreenDiscoverBar.module.scss";
import SearchInput from "./../../searchInput/SearchInput";

const BigScreenDiscoverBar = (props) => {
  return (
    <div className={classes.bigScreenDiscoverBarComponent}>
      <SearchInput />
      <div className={classes.discoverBarContent}>{props.children}</div>
    </div>
  );
};

export default BigScreenDiscoverBar;
