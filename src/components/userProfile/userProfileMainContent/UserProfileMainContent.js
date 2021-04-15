import React from "react";
import { connect } from "react-redux";

import classes from "./userProfileMainContent.module.scss";
import Header from "./../../pagesComponents/header/Header";
import MainContentWrapper from "./../../wrappers/mainContentWrapper/MainContentWrapper";
import Posts from "./../../pagesComponents/posts/Posts";
import AddPostModule from "./../../pagesComponents/addPostModule/AddPostModule";
import * as actions from "./../../../actions/index";
import { createArrayOfPosts } from "./../../../utilities/helperFunctions/createArrayOfPosts";
import User from "./user/User";

const UserProfileMainContent = (props) => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const userEmail = props.userData.modifiedEmail;
    if (props.usersPosts[userEmail]) {
      const downloadedPosts = createArrayOfPosts({ [userEmail]: props.usersPosts[userEmail] }, [userEmail]);
      props.onSetGetPostsLoading(false);
      setPosts(downloadedPosts);
    } else {
      const getPosts = new Promise((resolve) => {
        props.onGetUsersPosts(userEmail, resolve);
      });
      getPosts.then((response) => {
        const downloadedPosts = createArrayOfPosts(response, [userEmail]);
        setPosts(downloadedPosts);
        props.onSetGetPostsLoading(false);
      });
    }
  }, [props.userData.modifiedEmail, props.usersPosts]);

  return (
    <MainContentWrapper>
      <Header sectionName="Profile" />
      <User userData={props.userData} />
      <main>
        {props.userData?.type === "current" && <AddPostModule />}
        <Posts posts={posts} />
      </main>
    </MainContentWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    usersPosts: state.posts.usersPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsersPosts: (modifiedEmail, resolve) => dispatch(actions.getUsersPosts(modifiedEmail, resolve)),
    onSetGetPostsLoading: (loading) => dispatch(actions.setGetPostsLoading(loading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileMainContent);
