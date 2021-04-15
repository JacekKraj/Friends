import React from "react";
import classnames from "classnames";

import classes from "./autoComplete.module.scss";
import AutoCompleteOption from "./autoCompleteOption/AutoCompleteOption";

const AutoComplete = (props) => {
  return (
    <div className={classnames(classes.autoCompleteComponent, props.focus && classes.autoCompleteShow)} data-test="auto-complete-component">
      {props.suggestions.length ? (
        props.suggestions.map((el) => {
          return <AutoCompleteOption key={el.modifiedEmail} name={el.name} modifiedEmail={el.modifiedEmail} />;
        })
      ) : (
        <p data-test="no-matching-users-info" className={classes.info}>
          There are no matching users for this keyword.
        </p>
      )}
    </div>
  );
};

export default AutoComplete;
