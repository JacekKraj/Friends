import React from 'react';

import classes from './mainContentWrapper.module.scss';

const MainContentWrapper = ({ children }) => {
  return <div className={classes.mainContentWrapperComponent}>{children}</div>;
};

export default MainContentWrapper;
