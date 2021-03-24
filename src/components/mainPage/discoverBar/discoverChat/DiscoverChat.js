import React from "react";

import classes from "./discoverChat.module.scss";
import SectionTitle from "./../sectionTitile/SectionTitle";
import ChatUser from "./chatUser/ChatUser";

const DiscoverChat = (props) => {
  return (
    <div className={classes.discoverChatComponent}>
      <SectionTitle title="Chat" />
      <div className={classes.chat}>
        <ChatUser name="Jan Kowalski" modifiedEmail="jacekkrajewski12wppl" profileImage={null} />
        <ChatUser name="Stanisław Wyspiański" modifiedEmail="jacekkrajewski12wppl" />
        <ChatUser name="Jan Kowalski" modifiedEmail="jacekkrajewski12wppl" />
        <ChatUser name="Jan Kowalski" modifiedEmail="jacekkrajewski12wppl" />
        <ChatUser name="Jan Kowalski" modifiedEmail="jacekkrajewski12wppl" />
        <ChatUser name="Jan Kowalski" modifiedEmail="jacekkrajewski12wppl" />
      </div>
    </div>
  );
};

export default DiscoverChat;
