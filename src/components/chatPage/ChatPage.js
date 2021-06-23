import React from "react";

import classes from "./chatPage.module.scss";
import WholePageWrapper from "../wrappers/wholePageWrapper/WholePageWrapper";
import SideNav from "../pagesComponents/sideNav/SideNav";
import DiscoverBar from "./../pagesComponents/discoverBar/DiscoverBar";
import Chat from "./chat/Chat";
import DiscoverChat from "./../pagesComponents/discoverBar/discoverChat/DiscoverChat";

const ChatPage = () => {
  return (
    <WholePageWrapper>
      <SideNav />
      <Chat />
      <DiscoverBar>
        <DiscoverChat />
      </DiscoverBar>
    </WholePageWrapper>
  );
};

export default ChatPage;
