import { months } from './../selectTimeOptions/selectTimeOptions';

const getCurrentDate = () => {
  const date = new Date();

  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  return { currentDay, currentMonth, currentYear };
};

const getTransformedBirthdayDate = (birth) => {
  const dayOfBirth = parseInt(birth.day, 10);
  const yearOfBirth = parseInt(birth.year, 10);
  const monthOfBirth = months.findIndex((el) => {
    return el === birth.month;
  });

  return { dayOfBirth, monthOfBirth, yearOfBirth };
};

const validateAge = (currentDate, dateOfBirth) => {
  const { currentDay, currentMonth, currentYear } = currentDate;
  const { dayOfBirth, monthOfBirth, yearOfBirth } = dateOfBirth;

  if (currentYear - yearOfBirth < 18) return false;
  if (currentYear - yearOfBirth > 18) return true;
  if (currentMonth > monthOfBirth) return true;
  if (currentMonth < monthOfBirth) return false;
  if (currentDay >= dayOfBirth) return true;
  return false;
};

export const verifyUserAge = (birth) => {
  const { currentDay, currentMonth, currentYear } = getCurrentDate();

  const { dayOfBirth, monthOfBirth, yearOfBirth } = getTransformedBirthdayDate(birth);

  return validateAge({ currentDay, currentMonth, currentYear }, { dayOfBirth, monthOfBirth, yearOfBirth });
};
