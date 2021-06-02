import React from "react";

import classes from "./friendsPage.module.scss";
import WholePageWrapper from "./../wrappers/wholePageWrapper/WholePageWrapper";
import SideNav from "./../pagesComponents/sideNav/SideNav";
import FriendsPageMainContent from "./friendsPageMainContent/FriendsPageMainContent";

const FriendsPage = (props) => {
  return (
    <WholePageWrapper>
      <SideNav />
      <FriendsPageMainContent />
    </WholePageWrapper>
  );
};

export default FriendsPage;
