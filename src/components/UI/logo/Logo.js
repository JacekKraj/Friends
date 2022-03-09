import React from 'react';
import classnames from 'classnames';

import classes from './logo.module.scss';

const Logo = ({ className }) => {
  return (
    <div className={classnames(classes.logo, className)}>
      <p>f</p>
    </div>
  );
};

export default Logo;
