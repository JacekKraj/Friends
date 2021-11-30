import React from 'react';

import classes from './discoverBar.module.scss';
import SmallScreenDiscoverBar from './smallScreenDiscoverBar/SmallScreenDiscoverBar';
import BigScreenDiscoverBar from './bigScreenDiscoverBar/BigScreenDiscoverBar';

const DiscoverBar = ({ children }) => {
  return (
    <div className={classes.discoverBarComponent}>
      <div className={classes.smallScreenNavContainer}>
        <SmallScreenDiscoverBar>{children}</SmallScreenDiscoverBar>
      </div>
      <div className={classes.bigScreenNavContainer}>
        <BigScreenDiscoverBar>{children}</BigScreenDiscoverBar>
      </div>
    </div>
  );
};

export default DiscoverBar;
