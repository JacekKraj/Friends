import React from 'react';
import { useSelector } from 'react-redux';

import Header from './../../pagesComponents/header/Header';
import AddPostModule from './../../pagesComponents/addPostModule/AddPostModule';
import Posts from './../../pagesComponents/posts/Posts';
import MainContentWrapper from './../../wrappers/mainContentWrapper/MainContentWrapper';
import { useGetPosts } from '../../../utilities/hooks/useGetPosts';

const MainContent = () => {
  const { followedUsersEmails, modifiedEmail } = useSelector((state) => state.userData.currentUser);

  const posts = useGetPosts([...followedUsersEmails, modifiedEmail]);

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

export default MainContent;
