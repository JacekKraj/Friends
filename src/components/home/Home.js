import React from "react";
import { connect } from "react-redux";

import MainContent from "./mainContent/MainContent";
import DiscoverBar from "./../pagesComponents/discoverBar/DiscoverBar";
import SideNav from "./../pagesComponents/sideNav/SideNav";
import DiscoverFriends from "./../pagesComponents/discoverBar/discoverFriends/DiscoverFriends";
import DiscoverChat from "./../pagesComponents/discoverBar/discoverChat/DiscoverChat";
import WholePageWrapper from "./../wrappers/wholePageWrapper/WholePageWrapper";

const Home = (props) => {
  return (
    <WholePageWrapper>
      <SideNav />
      <MainContent />
      <DiscoverBar>
        <DiscoverFriends type="home" users={props.unfollowedUsers.slice(0, 3)} followedUsersEmails={props.followedUsersEmails} />
        <DiscoverChat />
      </DiscoverBar>
    </WholePageWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    unfollowedUsers: state.userData.unfollowedUsers,
    followedUsersEmails: state.userData.currentUser.followedUsersEmails,
  };
};

export default connect(mapStateToProps)(Home);
