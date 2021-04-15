import React from "react";

import MainContent from "./mainContent/MainContent";
import DiscoverBar from "./../pagesComponents/discoverBar/DiscoverBar";
import SideNav from "./../pagesComponents/sideNav/SideNav";
import DiscoverFriends from "./../pagesComponents/discoverBar/discoverFriends/DiscoverFriends";
import DiscoverChat from "./../pagesComponents/discoverBar/discoverChat/DiscoverChat";
import WholePageWrapper from "./../wrappers/wholePageWrapper/WholePageWrapper";

const Home = () => {
  return (
    <WholePageWrapper>
      <SideNav />
      <MainContent />
      <DiscoverBar>
        <DiscoverFriends type="home" />
        <DiscoverChat />
      </DiscoverBar>
    </WholePageWrapper>
  );
};

export default Home;
