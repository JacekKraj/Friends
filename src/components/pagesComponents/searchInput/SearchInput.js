import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { theme } from './../../../utilities/breakpoints/breakpoints';
import SearchIcon from '@material-ui/icons/Search';
import classes from './searchInput.module.scss';
import AutoComplete from './autoComplete/AutoComplete';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#555',
    [theme.breakpoints.up('0')]: {
      width: 24,
      height: 24,
    },
    [theme.breakpoints.up('400')]: {
      width: 29,
      height: 29,
    },

    [`${theme.breakpoints.up('600')} and (orientation:landscape)`]: {
      width: 28,
      height: 28,
    },
  },
}));

const SearchInput = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState('');
  const iconStyle = useStyles();
  const inputContainer = React.useRef();

  const handleOutsideClick = (event) => {
    if (!inputContainer.current.contains(event.target)) {
      setIsFocused(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={classes.container} ref={inputContainer}>
      <div className={classnames(classes.searchInputComponent, isFocused && classes.removeBorderRadius)}>
        <SearchIcon className={iconStyle.icon} />
        <input
          onFocus={() => {
            setIsFocused(true);
          }}
          placeholder='Search on Friends'
          className={classes.searchInput}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <AutoComplete input={{ value, isFocused }} />
    </div>
  );
};

export default SearchInput;
