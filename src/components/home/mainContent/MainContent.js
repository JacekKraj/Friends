import React from "react";
import { connect } from "react-redux";

import Header from "./../../pagesComponents/header/Header";
import AddPostModule from "./../../pagesComponents/addPostModule/AddPostModule";
import * as actions from "./../../../actions/index";
import Posts from "./../../pagesComponents/posts/Posts";
import { createArrayOfPosts } from "./../../../utilities/helperFunctions/createArrayOfPosts";
import MainContentWrapper from "./../../wrappers/mainContentWrapper/MainContentWrapper";

const MainContent = (props) => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const getPosts = (el) => {
      return new Promise((resolve) => {
        props.onGetUsersPosts(el, resolve);
      });
    };

    Promise.all([...props.followedUsersEmails, props.currUserModifiedEmail].map((el) => getPosts(el))).then(() => {
      props.onSetGetPostsLoading(false);
    });
  }, [props.currUserModifiedEmail]);

  React.useEffect(() => {
    const usersPosts = createArrayOfPosts(props.usersPosts, [...props.followedUsersEmails, props.currUserModifiedEmail]);
    setPosts(usersPosts);
  }, [props.usersPosts]);

  return (
    <MainContentWrapper>
      <Header sectionName="Home" />
      <main>
        <AddPostModule />
        <Posts posts={posts} />
      </main>
    </MainContentWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsersPosts: (modifiedEmail, resolve) => dispatch(actions.getUsersPosts(modifiedEmail, resolve)),
    onSetGetPostsLoading: (loading) => dispatch(actions.setGetPostsLoading(loading)),
  };
};

const mapStateToProps = (state) => {
  return {
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
    usersPosts: state.posts.usersPosts,
    followedUsersEmails: state.userData.currentUser.followedUsersEmails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
