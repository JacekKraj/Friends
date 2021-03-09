import React from "react";

import classes from "./mainContent.module.scss";
import Header from "./../../header/Header";

const MainContent = (props) => {
  return (
    <div className={classes.mainContentComponent}>
      <Header navOnClick={() => props.setShowNav(true)} sectionName="Home" />
    </div>
  );
};

export default MainContent;
