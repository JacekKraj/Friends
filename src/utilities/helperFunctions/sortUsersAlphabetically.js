const compareAlphabeticallOrder = (user1, user2) => {
  const userA = user1.name.toUpperCase();
  const userB = user2.name.toUpperCase();

  let comparison = 0;
  if (userA > userB) {
    comparison = 1;
  } else if (userA < userB) {
    comparison = -1;
  }
  return comparison;
};

export const sortUsersAlphabetically = (users) => {
  const usersArray = [...users];

  usersArray.sort(compareAlphabeticallOrder);

  return usersArray;
};
