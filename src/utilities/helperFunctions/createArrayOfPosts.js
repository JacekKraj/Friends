export const createArrayOfPosts = (usersPosts, users) => {
  let allUsersPosts = [];
  for (let user in usersPosts) {
    if (users.includes(user)) {
      const posts = Array.from(Object.values(usersPosts[user].posts));
      allUsersPosts = [...allUsersPosts, ...posts];
    }
  }

  const compareCreationTime = (a, b) => {
    const comprasion = a.post.creationTime - b.post.creationTime;
    return comprasion * -1;
  };

  allUsersPosts.sort(compareCreationTime);

  return allUsersPosts;
};
