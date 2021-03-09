import React from "react";

import classes from "./mainContent.module.scss";
import Header from "./../../header/Header";
import AddPostModule from "../../addPostModule/AddPostModule";

const MainContent = (props) => {
  return (
    <div className={classes.mainContentComponent}>
      <Header navOnClick={() => props.setShowNav(true)} sectionName="Home" />
      <main>
        <AddPostModule />
      </main>
    </div>
  );
};

export default MainContent;
