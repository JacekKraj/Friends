import React from 'react';
import classnames from 'classnames';

import classes from './input.module.scss';

const Input = (props) => {
  const { type, name, onChange, value, required, className, disabled, placeholder } = props;
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      required={required}
      className={classnames(className, classes.input)}
      disabled={disabled}
      placeholder={placeholder}
      autoComplete='off'
    ></input>
  );
};

export default Input;
