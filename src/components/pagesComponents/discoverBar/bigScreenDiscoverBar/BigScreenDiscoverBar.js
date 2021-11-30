import React from 'react';

import classes from './bigScreenDiscoverBar.module.scss';
import SearchInput from './../../searchInput/SearchInput';

const BigScreenDiscoverBar = ({ children }) => {
  return (
    <div className={classes.bigScreenDiscoverBarComponent}>
      <SearchInput />
      <div className={classes.discoverBarContent}>{children}</div>
    </div>
  );
};

export default BigScreenDiscoverBar;
