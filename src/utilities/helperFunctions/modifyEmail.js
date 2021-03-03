export const modifyEmail = (email) => {
  const modifiedEmail = email.replace(/[.*+\-?^${}()|[\]@\\]/g, "");
  return modifiedEmail;
};
