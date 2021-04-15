import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./userProfile.module.scss";
import UserProfileMainContent from "./userProfileMainContent/UserProfileMainContent";
import SideNav from "./../pagesComponents/sideNav/SideNav";
import DiscoverBar from "./../pagesComponents/discoverBar/DiscoverBar";
import WholePageWrapper from "../wrappers/wholePageWrapper/WholePageWrapper";

const UserProfile = (props) => {
  const [userData, setUserData] = React.useState({});
  const location = useLocation();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userEmail = searchParams.get("user");
    let type, user;
    if (userEmail === props.currentUser.modifiedEmail) {
      user = { ...props.currentUser };
      type = "current";
    } else {
      user = props.unfollowedUsers.find((el) => {
        return el.modifiedEmail === userEmail;
      });
      if (user) {
        type = "unfollowed";
      } else {
        user = props.followedUsers.find((el) => {
          return el.modifiedEmail === userEmail;
        });
        type = "followed";
      }
    }
    setUserData({ ...user, type });
  }, [props.currUserModifiedEmail, props.followedUsers.length, props.unfollowedUsers.length]);

  return (
    <WholePageWrapper>
      <SideNav />
      <UserProfileMainContent userData={userData} />
      <DiscoverBar />
    </WholePageWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    followedUsers: state.userData.followedUsers,
    unfollowedUsers: state.userData.unfollowedUsers,
    currentUser: state.userData.currentUser,
  };
};

export default connect(mapStateToProps)(UserProfile);
