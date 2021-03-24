import React from "react";

import classes from "./bigScreenDiscoverBar.module.scss";
import SearchInput from "./../../searchInput/SearchInput";

const BigScreenDiscoverBar = (props) => {
  return (
    <div className={classes.bigScreenDiscoverBarComponent}>
      <SearchInput />
      {props.children}
    </div>
  );
};

export default BigScreenDiscoverBar;
