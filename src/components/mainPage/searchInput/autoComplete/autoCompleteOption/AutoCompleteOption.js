import React from "react";
import { NavLink } from "react-router-dom";
import defaultUserImage from "./../../../../../assets/images/defaultUserImage.png";

import classes from "./autoCompleteOption.module.scss";

const AutoCompleteOption = (props) => {
  return (
    <div className={classes.autoCompleteOptionComponent}>
      <NavLink to={props.modifiedEmail} className={classes.user}>
        <img src={props.profileImage ? props.profileImage : defaultUserImage} className={classes.profileImage} />
        <p className={classes.name} data-test="user-name">
          {props.name}
        </p>
      </NavLink>
    </div>
  );
};

export default AutoCompleteOption;
