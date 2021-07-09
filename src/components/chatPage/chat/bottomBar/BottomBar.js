import React from "react";
import classnames from "classnames";

import classes from "./bottomBar.module.scss";
import Button from "../../../UI/button/Button";
import EmojiPicker from "./../../../../utilities/emojiPicker/EmojiPicker";

const TextInput = (props) => {
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const input = React.useRef();

  React.useEffect(() => {
    input.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  return (
    <div className={classes.bottomBarComponent}>
      <EmojiPicker
        inputValue={props.value}
        input={input}
        setCursorPosition={setCursorPosition}
        handleChangeInputValue={(text) => props.handleChange({ target: { value: text } })}
        pickerStyle={{ bottom: "100%" }}
      />
      <form className={classnames(classes.form, props.foreign && classes.inputDisabled)} onSubmit={(e) => props.handleSubmit(e)}>
        <div className={classes.inputContainer}>
          <input
            required={true}
            placeholder="Write your message"
            value={props.value}
            onChange={(e) => props.handleChange(e)}
            disabled={props.foreign}
            ref={input}
          />
        </div>
        <Button className={classes.button} disabled={props.foreign}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default TextInput;
