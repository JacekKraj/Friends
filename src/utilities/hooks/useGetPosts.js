import React from 'react';
import { useSelector } from 'react-redux';

import { getArrayOfPosts } from '../helperFunctions/getArrayOfPosts';
import { useActions } from './useActions';

export const useGetPosts = (users) => {
  const [posts, setPosts] = React.useState([]);

  const { downloadUserPosts, setIsGetPostsLoading } = useActions();
  const { usersPosts } = useSelector((state) => state.posts);

  const isAnEmptyArray = () => {
    return !users.join('');
  };

  React.useEffect(() => {
    if (isAnEmptyArray()) return;

    const downloadPosts = (user) => {
      return new Promise((resolve) => {
        downloadUserPosts(user, resolve);
      });
    };

    Promise.all(users.map((user) => downloadPosts(user))).then(() => {
      setIsGetPostsLoading(false);
    });
  }, [JSON.stringify(users)]);

  React.useEffect(() => {
    const relevantPosts = getArrayOfPosts(usersPosts, users);
    setPosts(relevantPosts);
  }, [usersPosts]);

  return posts;
};
