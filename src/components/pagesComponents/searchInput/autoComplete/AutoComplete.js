import React from 'react';
import { useSelector } from 'react-redux';

import classes from './autoComplete.module.scss';
import AutoCompleteOption from './autoCompleteOption/AutoCompleteOption';
import NoUsersInfo from './../../discoverBar/noUsersInfo/NoUsersInfo';

const AutoComplete = ({ input }) => {
  const { followedUsers, unfollowedUsers } = useSelector((state) => state.userData);

  const [suggestions, setSuggestions] = React.useState([]);

  const validateInputValue = (value) => {
    if (value.trim().length === 0) {
      setSuggestions([]);
      return;
    }
  };

  const removeRedundantSpaces = (text) => {
    const updatedText = text.replace(/\s+/g, ' ').trim();
    return updatedText;
  };

  const getNewSuggestions = (value) => {
    const updatedValue = removeRedundantSpaces(value);
    const newSuggestions = [...followedUsers, ...unfollowedUsers].filter((user) => {
      return user.name.toLowerCase().trim().includes(updatedValue.toLowerCase());
    });
    return newSuggestions;
  };

  React.useEffect(() => {
    if (!input.value) return;

    validateInputValue(input.value);

    const newSuggestions = getNewSuggestions(input.value);

    setSuggestions(newSuggestions);
  }, [input.value]);

  return input.isFocused && input.value.trim() ? (
    <div className={classes.autoCompleteComponent} data-test='auto-complete-component'>
      {suggestions.length ? (
        suggestions.map((user) => {
          const searchedUser = { name: user.name, modifiedEmail: user.modifiedEmail, profileImage: user.profileImage };
          return <AutoCompleteOption key={user.modifiedEmail} searchedUser={searchedUser} />;
        })
      ) : (
        <NoUsersInfo>There are no matching users for this keyword.</NoUsersInfo>
      )}
    </div>
  ) : null;
};

export default AutoComplete;
