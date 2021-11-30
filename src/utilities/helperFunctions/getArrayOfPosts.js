const compareCreationTime = (a, b) => {
  const comprasion = a.post.creationTime - b.post.creationTime;
  return comprasion * -1;
};

const sortBuildedPosts = (posts) => {
  posts.sort(compareCreationTime);
};

const userIsEnabled = (enabledUsersEmails, userEmail) => {
  return !!enabledUsersEmails.includes(userEmail);
};

const buildArrayOfPosts = (usersPosts, enabledUsersEmails) => {
  let buildedPosts = [];

  for (let userEmail in usersPosts) {
    if (userIsEnabled(enabledUsersEmails, userEmail)) {
      const posts = Array.from(Object.values(usersPosts[userEmail].posts));
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
