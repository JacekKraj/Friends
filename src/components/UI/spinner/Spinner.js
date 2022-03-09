import React from 'react';
import classnames from 'classnames';

import classes from './spinner.module.scss';

const Spinner = ({ className }) => {
  return (
    <div className={classes.spinnerCenter} data-test='component-spinner'>
      <div className={classnames(classes.loader, className)}></div>
    </div>
  );
};

export default Spinner;
