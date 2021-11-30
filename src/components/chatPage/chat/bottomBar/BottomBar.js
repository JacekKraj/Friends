import React from 'react';
import classnames from 'classnames';

import classes from './bottomBar.module.scss';
import Button from '../../../UI/button/Button';
import EmojiPicker from './../../../../utilities/emojiPicker/EmojiPicker';

const BottomBar = (props) => {
  const { input, isForeignUser } = props;

  const [cursorPosition, setCursorPosition] = React.useState(0);

  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  return (
    <div className={classes.bottomBarComponent}>
      <EmojiPicker
        input={{ value: input.value, changeValue: input.changeValue, ref: inputRef }}
        setCursorPosition={setCursorPosition}
        pickerStyle={{ bottom: '100%' }}
      />
      <form className={classnames(classes.form, isForeignUser && classes.inputDisabled)} onSubmit={(e) => input.submit(e)}>
        <div className={classes.inputContainer}>
          <input
            required
            placeholder='Write your message'
            value={input.value}
            onChange={(e) => input.changeValue(e.target.value)}
            disabled={isForeignUser}
            ref={inputRef}
          />
        </div>
        <Button className={classes.button} disabled={isForeignUser}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default BottomBar;
