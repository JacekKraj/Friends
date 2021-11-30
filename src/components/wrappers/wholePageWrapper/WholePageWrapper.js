import React from 'react';

import classes from './wholePageWrapper.module.scss';

const WholePageWrapper = ({ children }) => {
  return <div className={classes.pageContentWrapperComponent}>{children}</div>;
};

export default WholePageWrapper;
