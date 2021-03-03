import { months } from "./../selectTimeOptions/selectTimeOptions";

export const verifyUserAge = (dayOfBirth, monthOfBirth, yearOfBirth) => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  dayOfBirth = parseInt(dayOfBirth, 10);
  yearOfBirth = parseInt(yearOfBirth, 10);
  monthOfBirth = months.findIndex((el) => {
    return el === monthOfBirth;
  });

  if (year - yearOfBirth > 18) {
    return true;
  } else if (year - yearOfBirth === 18) {
    if (month > monthOfBirth) {
      return true;
    } else if (month === monthOfBirth) {
      if (day >= dayOfBirth) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
