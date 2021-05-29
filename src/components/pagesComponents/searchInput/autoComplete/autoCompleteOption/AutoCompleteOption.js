import React from "react";

import User from "./../../../discoverBar/user/User";
import classes from "./autoCompleteOption.module.scss";

const AutoCompleteOption = (props) => {
  return (
    <div className={classes.autoCompleteOptionComponent}>
      <User link={`users?user=${props.modifiedEmail}`} profileImage={props.profileImage} name={props.name} dataTest="user-name" />
    </div>
  );
};

export default AutoCompleteOption;
