import React from 'react';

import Header from './../../pagesComponents/header/Header';
import MainContentWrapper from './../../wrappers/mainContentWrapper/MainContentWrapper';
import Posts from './../../pagesComponents/posts/Posts';
import AddPostModule from './../../pagesComponents/addPostModule/AddPostModule';
import User from './user/User';
import { useGetPosts } from '../../../utilities/hooks/useGetPosts';

const UserProfileMainContent = ({ user }) => {
  const posts = useGetPosts([user?.modifiedEmail]);

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

export default UserProfileMainContent;
