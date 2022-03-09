import React from 'react';

import User from './../../../discoverBar/user/User';
import classes from './autoCompleteOption.module.scss';

const AutoCompleteOption = ({ searchedUser }) => {
  const { modifiedEmail, profileImage, name } = searchedUser;
  return (
    <div className={classes.autoCompleteOptionComponent}>
      <User navigateTo={`users?user=${modifiedEmail}`} user={{ profileImage, name }} dataTest='user-name' />
    </div>
  );
};

export default AutoCompleteOption;
