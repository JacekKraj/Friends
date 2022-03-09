const compareCreationTime = (a, b) => {
  const comprasion = a.creationTime - b.creationTime;
  return comprasion * -1;
};

const sortBuildedPosts = (posts) => {
  posts.sort(compareCreationTime);
};

const userIsEnabled = (enabledUsersEmails, userEmail) => {
  return !!enabledUsersEmails.includes(userEmail);
};

const appendAuthorToPosts = (author, posts) => {
  let postsWithAuhtor = {};
  for (let index in posts) {
    postsWithAuhtor = Object.assign({ [index]: { ...posts[index], author } }, postsWithAuhtor);
  }

  return postsWithAuhtor;
};

const buildArrayOfPosts = (usersPosts, enabledUsersEmails) => {
  let buildedPosts = [];

  for (let userEmail in usersPosts) {
    if (userIsEnabled(enabledUsersEmails, userEmail)) {
      const postsWithAuthor = appendAuthorToPosts(userEmail, usersPosts[userEmail].posts);
      const posts = Array.from(Object.values(postsWithAuthor));
      buildedPosts = [...buildedPosts, ...posts];
    }
  }

  return buildedPosts;
};

export const getArrayOfPosts = (usersPosts, enabledUsersEmails) => {
  const buildedPosts = buildArrayOfPosts(usersPosts, enabledUsersEmails);

  sortBuildedPosts(buildedPosts);

  return buildedPosts;
};
