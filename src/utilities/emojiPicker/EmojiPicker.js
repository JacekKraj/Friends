import React from 'react';
import Picker from 'emoji-picker-react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from './../breakpoints/breakpoints';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import classes from './emojiPickerContainer.module.scss';

const useStyles = makeStyles(() => ({
  emoji: {
    color: '#00B2EE',
    cursor: 'pointer',
    position: 'relative',
    [theme.breakpoints.up('0')]: {
      width: 28,
      height: 28,
    },
    [theme.breakpoints.up('768')]: {
      width: 35,
      height: 35,
    },

    [`${theme.breakpoints.up('600')} and (orientation:landscape)`]: {
      width: 28,
      height: 28,
    },
    [`${theme.breakpoints.up('1000')} and (orientation:landscape)`]: {
      width: 30,
      height: 30,
    },
  },
}));

const EmojiPicker = (props) => {
  const { input, setCursorPosition, pickerStyle } = props;

  const iconStyle = useStyles();

  const [showPicker, setShowPicker] = React.useState(false);

  const picker = React.useRef();

  const handleShowPicker = () => {
    input.ref.current.focus();
    setShowPicker(!showPicker);
  };

  const handleOutsideClick = (event) => {
    if (picker.current) {
      if (!picker.current.contains(event.target)) {
        setShowPicker(false);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleChooseEmoji = (_, { emoji }) => {
    input.ref.current.focus();

    const mousePosition = input.ref.current.selectionStart;
    const firstStringPart = input.value.substring(0, mousePosition);
    const secondStringPart = input.value.substring(mousePosition);

    input.changeValue(firstStringPart + emoji + secondStringPart);
    setCursorPosition(mousePosition + emoji.length);
  };
  return (
    <div ref={picker} className={classes.emojiPickerContainer}>
      <EmojiEmotionsIcon className={iconStyle.emoji} onClick={handleShowPicker} />
      {showPicker && (
        <Picker
          preload={false}
          disableSearchBar={true}
          onEmojiClick={handleChooseEmoji}
          pickerStyle={{ position: 'absolute', zIndex: 10, left: '0%', maxHeight: '45vh', ...pickerStyle }}
        />
      )}
    </div>
  );
};

export default EmojiPicker;
