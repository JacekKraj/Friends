import React from 'react';
import { connect } from 'react-redux';

import Header from './../../pagesComponents/header/Header';
import MainContentWrapper from './../../wrappers/mainContentWrapper/MainContentWrapper';
import Posts from './../../pagesComponents/posts/Posts';
import AddPostModule from './../../pagesComponents/addPostModule/AddPostModule';
import * as actions from './../../../actions/index';
import { getArrayOfPosts } from '../../../utilities/helperFunctions/getArrayOfPosts';
import User from './user/User';

const UserProfileMainContent = (props) => {
  const { user, usersPosts, onGetUserPosts, onSetIsGetPostsLoading } = props;

  const [posts, setPosts] = React.useState([]);

  const postsAreDownloaded = (userEmail) => {
    return !!usersPosts[userEmail];
  };

  React.useEffect(() => {
    if (!user.modifiedEmail) return;

    if (postsAreDownloaded(user.modifiedEmail)) {
      onSetIsGetPostsLoading(false);
      return;
    }

    const getPosts = async () => {
      await onGetUserPosts(user.modifiedEmail, () => {});
      onSetIsGetPostsLoading(false);
    };

    getPosts();
  }, [user.modifiedEmail]);

  React.useEffect(() => {
    if (!usersPosts[user.modifiedEmail]) return;

    const userPosts = getArrayOfPosts({ [user.modifiedEmail]: usersPosts[user.modifiedEmail] }, [user.modifiedEmail]);
    setPosts(userPosts);
  }, [user.modifiedEmail, usersPosts]);

  return (
    <MainContentWrapper>
      <Header sectionName='Profile' />
      <User user={user} />
      <main>
        {user?.type === 'current' && <AddPostModule />}
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
    onGetUserPosts: (modifiedEmail, resolve) => dispatch(actions.getUserPosts(modifiedEmail, resolve)),
    onSetIsGetPostsLoading: (loading) => dispatch(actions.setIsGetPostsLoading(loading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileMainContent);
