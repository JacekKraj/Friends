import React from "react";
import classnames from "classnames";

import classes from "./autoComplete.module.scss";
import AutoCompleteOption from "./autoCompleteOption/AutoCompleteOption";
import NoUsersInfo from "./../../discoverBar/noUsersInfo/NoUsersInfo";

const AutoComplete = (props) => {
  return (
    <div className={classnames(classes.autoCompleteComponent, props.focus && classes.autoCompleteShow)} data-test="auto-complete-component">
      {props.suggestions.length ? (
        props.suggestions.map((el) => {
          return <AutoCompleteOption key={el.modifiedEmail} name={el.name} profileImage={el.profileImage} modifiedEmail={el.modifiedEmail} />;
        })
      ) : (
        <NoUsersInfo>There are no matching users for this keyword.</NoUsersInfo>
      )}
    </div>
  );
};

export default AutoComplete;
