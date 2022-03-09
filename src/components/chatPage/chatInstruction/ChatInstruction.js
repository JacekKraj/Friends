import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './chatInstruction.module.scss';
import MainContentWrapper from './../../wrappers/mainContentWrapper/MainContentWrapper';
import Header from './../../pagesComponents/header/Header';
import Button from './../../UI/button/Button';

const ChatInstruction = (props) => {
  return (
    <MainContentWrapper>
      <Header sectionName='Chat' />
      <div className={classes.chatInstructionComponent} data-test='component-chat-instruction'>
        <h3>Send and recive messages</h3>
        <p>Choose a friend from your chat list or follow other users to start texting with them!</p>
        <NavLink to='/friends'>
          <Button className={classes.button}>Follow others</Button>
        </NavLink>
      </div>
    </MainContentWrapper>
  );
};

export default ChatInstruction;
