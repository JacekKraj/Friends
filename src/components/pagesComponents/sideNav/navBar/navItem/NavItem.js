import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './navItem.module.scss';

const NavItem = (props) => {
  const { navigateTo, icon, label, onClick } = props;
  return (
    <NavLink to={navigateTo} exact onClick={onClick}>
      <div className={classes.navItemComponent}>
        <div className={classes.iconContainer}>{icon}</div>
        <p className={classes.description}>{label}</p>
      </div>
    </NavLink>
  );
};

export default NavItem;
