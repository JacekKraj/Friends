import React from 'react';
import { connect } from 'react-redux';

import Header from './../../pagesComponents/header/Header';
import AddPostModule from './../../pagesComponents/addPostModule/AddPostModule';
import * as actions from './../../../actions/index';
import Posts from './../../pagesComponents/posts/Posts';
import { getArrayOfPosts } from './../../../utilities/helperFunctions/getArrayOfPosts';
import MainContentWrapper from './../../wrappers/mainContentWrapper/MainContentWrapper';

const MainContent = (props) => {
  const { onGetUsersPosts, onSetGetPostsLoading, currUserModifiedEmail, usersPosts, followedUsersEmails } = props;

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const getPosts = (user) => {
      return new Promise((resolve) => {
        onGetUsersPosts(user, resolve);
      });
    };

    Promise.all([...followedUsersEmails, currUserModifiedEmail].map((user) => getPosts(user))).then(() => {
      onSetGetPostsLoading(false);
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
