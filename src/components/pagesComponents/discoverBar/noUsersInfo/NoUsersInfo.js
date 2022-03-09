import React from 'react';

import classes from './noUsersInfo.module.scss';

const NoUsersInfo = ({ children }) => {
  return (
    <p data-test='no-users-info' className={classes.info}>
      {children}
    </p>
  );
};

export default NoUsersInfo;
