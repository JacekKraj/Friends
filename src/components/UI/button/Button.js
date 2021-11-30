import React from 'react';
import classnames from 'classnames';

import classes from './button.module.scss';

const Button = (props) => {
  const { disabled, onClick, className, isTransparent, testData, children } = props;
  return (
    <button
      type='submit'
      disabled={disabled}
      onClick={onClick}
      className={classnames(
        classes.button,
        className,
        isTransparent ? classes.buttonTransparent : classes.buttonNormal,
        disabled && classes.buttonDisabled
      )}
      data-test={testData}
    >
      {children}
    </button>
  );
};

export default Button;
