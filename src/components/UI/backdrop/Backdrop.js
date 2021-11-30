import React from 'react';

import classes from './backdrop.module.scss';

const Backdrop = ({ onClick }) => {
  return <div onClick={onClick} className={classes.backdrop} data-test='component-backdrop'></div>;
};

export default Backdrop;
