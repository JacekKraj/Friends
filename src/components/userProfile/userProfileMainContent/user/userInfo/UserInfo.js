import React from 'react';

import classes from './userInfo.module.scss';

const UserInfo = ({ icon, text }) => {
  return (
    <div className={classes.userInfoComponent} data-test='user-info-component'>
      {icon}
      <p className={classes.text}>{text}</p>
    </div>
  );
};

export default UserInfo;
