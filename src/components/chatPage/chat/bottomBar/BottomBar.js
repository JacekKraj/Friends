import React from "react";

import classes from "./bottomBar.module.scss";
import Button from "../../../UI/button/Button";

const TextInput = (props) => {
  return (
    <div className={classes.bottomBarComponent}>
      <div></div>

      <form className={classes.inputContainer}>
        <input required={true} placeholder="Write your message" />
      </form>
      <Button className={classes.button}>Send</Button>
    </div>
  );
};

export default TextInput;
