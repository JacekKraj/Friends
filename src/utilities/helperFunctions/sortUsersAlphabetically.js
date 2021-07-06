export const sortUsersAlphabetically = (users) => {
  const compareAlphabeticallOrder = (a, b) => {
    const userA = a.name.toUpperCase();
    const userB = b.name.toUpperCase();

    let comparison = 0;
    if (userA > userB) {
      comparison = 1;
    } else if (userA < userB) {
      comparison = -1;
    }
    return comparison;
  };

  users.sort(compareAlphabeticallOrder);

  return users;
};
