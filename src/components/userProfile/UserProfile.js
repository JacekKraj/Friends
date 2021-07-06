import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import UserProfileMainContent from "./userProfileMainContent/UserProfileMainContent";
import SideNav from "./../pagesComponents/sideNav/SideNav";
import DiscoverBar from "./../pagesComponents/discoverBar/DiscoverBar";
import WholePageWrapper from "../wrappers/wholePageWrapper/WholePageWrapper";
import UserProfileDiscoverBar from "./userProfileDiscoverBar/UserProfileDiscoverBar";

const UserProfile = (props) => {
  const [userData, setUserData] = React.useState({});
  const [redirect, setRedirect] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userEmail = searchParams.get("user");
    let type, user;
    if (userEmail) {
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
      if (user) {
        setUserData({ ...user, type });
      } else {
        setRedirect(true);
      }
    } else {
      setRedirect(true);
    }
  }, [
    props.currUserModifiedEmail,
    props.followedUsers.length,
    props.unfollowedUsers.length,
    props.currentUser.profileImage,
    JSON.stringify(props.currentUser.personalInfo),
  ]);

  return (
    <WholePageWrapper>
      {redirect && <Redirect to="usernotfound" />}
      <SideNav />
      <UserProfileMainContent userData={userData} />
      <DiscoverBar>
        <UserProfileDiscoverBar followed={userData.followedUsersEmails} />
      </DiscoverBar>
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
