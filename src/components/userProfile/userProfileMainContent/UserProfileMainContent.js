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

  const getUserPosts = (userEmail) => {
    return new Promise((resolve) => {
      const arePostsDownloaded = postsAreDownloaded(userEmail);

      if (arePostsDownloaded) {
        const posts = getArrayOfPosts({ [userEmail]: usersPosts[userEmail] }, [userEmail]);
        resolve(posts);
        return;
      }
      const fetchPostsFromDatabse = new Promise((resolve) => {
        onGetUserPosts(userEmail, resolve);
      });

      fetchPostsFromDatabse.then((response) => {
        const posts = getArrayOfPosts(response, [userEmail]);
        resolve(posts);
        return;
      });
    });
  };

  React.useEffect(() => {
    const setupPosts = async () => {
      const userPosts = await getUserPosts(user.modifiedEmail);

      onSetIsGetPostsLoading(false);
      setPosts(userPosts);
    };

    setupPosts();
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
