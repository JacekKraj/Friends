import React from 'react';
import { connect } from 'react-redux';

import Header from './../../pagesComponents/header/Header';
import AddPostModule from './../../pagesComponents/addPostModule/AddPostModule';
import * as actions from './../../../actions/index';
import Posts from './../../pagesComponents/posts/Posts';
import { getArrayOfPosts } from './../../../utilities/helperFunctions/getArrayOfPosts';
import MainContentWrapper from './../../wrappers/mainContentWrapper/MainContentWrapper';

const MainContent = (props) => {
  const { onGetUserPosts, onSetIsGetPostsLoading, currUserModifiedEmail, usersPosts, followedUsersEmails } = props;

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const getPosts = (user) => {
      return new Promise((resolve) => {
        onGetUserPosts(user, resolve);
      });
    };

    Promise.all([...followedUsersEmails, currUserModifiedEmail].map((user) => getPosts(user))).then(() => {
      onSetIsGetPostsLoading(false);
    });
  }, [currUserModifiedEmail]);

  React.useEffect(() => {
    const enabledUsersEmails = [...followedUsersEmails, currUserModifiedEmail];
    const followedUsersPosts = getArrayOfPosts(usersPosts, enabledUsersEmails);
    setPosts(followedUsersPosts);
  }, [usersPosts]);

  return (
    <MainContentWrapper>
      <Header sectionName='Home' />
      <main>
        <AddPostModule />
        <Posts posts={posts} />
      </main>
    </MainContentWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserPosts: (modifiedEmail, resolve) => dispatch(actions.getUserPosts(modifiedEmail, resolve)),
    onSetIsGetPostsLoading: (loading) => dispatch(actions.setIsGetPostsLoading(loading)),
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
