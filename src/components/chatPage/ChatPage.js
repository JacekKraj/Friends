import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ChatInstruction from './chatInstruction/ChatInstruction';
import WholePageWrapper from '../wrappers/wholePageWrapper/WholePageWrapper';
import SideNav from '../pagesComponents/sideNav/SideNav';
import DiscoverBar from './../pagesComponents/discoverBar/DiscoverBar';
import Chat from './chat/Chat';
import DiscoverChat from './../pagesComponents/discoverBar/discoverChat/DiscoverChat';
import { sortUsersAlphabetically } from '../../utilities/helperFunctions/sortUsersAlphabetically';
import Spinner from './../UI/spinner/Spinner';
import * as actions from './../../actions/index';

const ChatPage = ({ userData, onRemoveNotification, chatNotifications }) => {
  const { followedUsers, unfollowedUsers, currentUser } = userData;

  const currUserModifiedEmail = currentUser.modifiedEmail;

  const [textedUser, setTextedUser] = React.useState({});
  const [chattingUsers, setChattingUsers] = React.useState('');
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  const location = useLocation();

  const findTextedUser = (userEmail) => {
    let foundUser = followedUsers.filter((user) => user.modifiedEmail === userEmail)[0];
    if (!foundUser) {
      foundUser = { ...unfollowedUsers.filter((user) => user.modifiedEmail === userEmail)[0], isForeign: true };
    }
    return foundUser;
  };

  const setTextingUsers = (textedUserEmail) => {
    if (!textedUserEmail) {
      setShouldRedirect(true);
      return;
    }

    const textedUser = findTextedUser(textedUserEmail);

    if (!textedUser.modifiedEmail) {
      setChattingUsers('unknown');
      return;
    }

    setTextedUser(textedUser);
    const sortedUsers = sortUsersAlphabetically([{ name: currUserModifiedEmail }, { name: textedUserEmail }]);
    const [firstUser, secondUser] = sortedUsers;
    setChattingUsers(`${firstUser.name}${secondUser.name}`);
  };

  const getTextedUserEmailFromSearchParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('to');
    return email;
  };

  React.useEffect(() => {
    const textedUserEmail = getTextedUserEmailFromSearchParams();

    setTextingUsers(textedUserEmail);
  }, [currUserModifiedEmail]);

  React.useEffect(() => {
    if (chatNotifications?.includes(textedUser.modifiedEmail)) {
      onRemoveNotification(currUserModifiedEmail, textedUser.modifiedEmail, chatNotifications);
    }
  }, [textedUser.modifiedEmail, chatNotifications, currUserModifiedEmail]);

  return (
    <WholePageWrapper>
      {shouldRedirect && <Redirect to='/chat?to=new' />}
      {chattingUsers ? (
        <React.Fragment>
          <SideNav />
          {textedUser.modifiedEmail ? <Chat textedUser={textedUser} chattingUsers={chattingUsers} /> : <ChatInstruction />}
          <DiscoverBar>
            <DiscoverChat currentChat={textedUser.modifiedEmail} />
          </DiscoverBar>
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </WholePageWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    chatNotifications: state.chat.notifications,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveNotification: (currUser, userToRemove, notifications) => dispatch(actions.removeNotification(currUser, userToRemove, notifications)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
