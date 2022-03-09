import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import classes from './errorPage.module.scss';
import Logo from '../UI/logo/Logo';

const ErrorPage = ({ error, className }) => {
  const { type, message, image, advice } = error;

  return (
    <div className={classes.nofoundComponent}>
      <div className={classes.text}>
        <NavLink to='/' exact>
          <Logo />
        </NavLink>
        <h4>
          {type}
          <span>That's an error.</span>
        </h4>
        <p>
          {message}
          <span>{advice}</span>
        </p>
      </div>
      <div className={classnames(classes.imageContainer, className)}>
        <img src={image} alt='error image' />
      </div>
    </div>
  );
};

export default ErrorPage;
