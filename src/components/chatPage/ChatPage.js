import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ChatInstruction from "./chatInstruction/ChatInstruction";
import WholePageWrapper from "../wrappers/wholePageWrapper/WholePageWrapper";
import SideNav from "../pagesComponents/sideNav/SideNav";
import DiscoverBar from "./../pagesComponents/discoverBar/DiscoverBar";
import Chat from "./chat/Chat";
import DiscoverChat from "./../pagesComponents/discoverBar/discoverChat/DiscoverChat";
import { sortUsersAlphabetically } from "../../utilities/helperFunctions/sortUsersAlphabetically";
import Spinner from "./../UI/spinner/Spinner";
import * as actions from "./../../actions/index";

const ChatPage = (props) => {
  const [user, setUser] = React.useState({});
  const [collection, setCollection] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const location = useLocation();

  const searchUser = React.useCallback((userEmail) => {
    let foundUser = props.followedUsers.filter((el) => el.modifiedEmail === userEmail)[0];
    if (!foundUser) {
      foundUser = { ...props.unfollowedUsers.filter((el) => el.modifiedEmail === userEmail)[0], foreign: true };
    }
    return foundUser;
  }, []);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let userEmail = searchParams.get("to");
    if (userEmail) {
      let foundUser = searchUser(userEmail);
      if (foundUser.modifiedEmail && props.currUserModifiedEmail) {
        setUser(foundUser);
        const sortedNames = sortUsersAlphabetically([{ name: props.currUserModifiedEmail }, { name: userEmail }]);
        setCollection(`${sortedNames[0].name}${sortedNames[1].name}`);
      } else {
        setCollection(true);
      }
    } else {
      setRedirect(true);
    }
  }, [props.currUserModifiedEmail]);

  React.useEffect(() => {
    if (props.chatNotifications?.includes(user.modifiedEmail)) {
      props.onRemoveNotification(props.currUserModifiedEmail, user.modifiedEmail, props.chatNotifications);
    }
  }, [user.modifiedEmail, props.notifications]);
  return (
    <WholePageWrapper>
      {redirect && <Redirect to="/" />}
      {collection ? (
        <React.Fragment>
          <SideNav />
          {user.modifiedEmail ? <Chat user={user} collection={collection} /> : <ChatInstruction />}
          <DiscoverBar>
            <DiscoverChat currentChat={user.modifiedEmail} />
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
    followedUsers: state.userData.followedUsers,
    unfollowedUsers: state.userData.unfollowedUsers,
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
    chatNotifications: state.chat.notifications,
    lastChat: state.chat.lastChat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveNotification: (currUser, userToRemove, notifications) => dispatch(actions.removeNotification(currUser, userToRemove, notifications)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
