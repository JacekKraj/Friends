import React from "react";
import { useLocation } from "react-router-dom";

import classes from "./chat.module.scss";
import MainContentWrapper from "./../../wrappers/mainContentWrapper/MainContentWrapper";
import Header from "./../../pagesComponents/header/Header";
import BottomBar from "./bottomBar/BottomBar";
import MessagesArea from "./messagesArea/MessagesArea";

const Chat = () => {
  return (
    <MainContentWrapper>
      <div className={classes.chatComponent}>
        <Header sectionName="Jaś Kapela" />
        <main>
          <MessagesArea />
          <BottomBar />
        </main>
      </div>
    </MainContentWrapper>
  );
};

export default Chat;
