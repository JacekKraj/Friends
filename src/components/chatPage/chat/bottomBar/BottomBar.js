import React from "react";
import classnames from "classnames";

import classes from "./bottomBar.module.scss";
import Button from "../../../UI/button/Button";

const TextInput = (props) => {
  return (
    <div className={classes.bottomBarComponent}>
      <form className={classnames(classes.inputContainer, props.foreign && classes.inputDisabled)} onSubmit={(e) => props.handleSubmit(e)}>
        <input
          required={true}
          placeholder="Write your message"
          value={props.value}
          onChange={(e) => props.handleChange(e)}
          disabled={props.foreign}
        />
      </form>
      <Button className={classes.button} onClick={(e) => props.handleSubmit(e)} disabled={props.foreign}>
        Send
      </Button>
    </div>
  );
};

export default TextInput;
