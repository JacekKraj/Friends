export const sortUsersAlphabetically = (users) => {
  const compareAlphabeticallOrder = (a, b) => {
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  users.sort(compareAlphabeticallOrder);

  return users;
};
