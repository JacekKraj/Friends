import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";
import { connect } from "react-redux";

import SearchIcon from "@material-ui/icons/Search";
import classes from "./searchInput.module.scss";
import AutoComplete from "./autoComplete/AutoComplete";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 411,
      md: 600,
      lg: 800,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    color: "#555",
    [theme.breakpoints.up("xs")]: {
      width: 24,
      height: 24,
    },
    [theme.breakpoints.up("sm")]: {
      width: 29,
      height: 29,
    },

    [theme.breakpoints.up("md")]: {
      width: 45,
      height: 45,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 28,
      height: 28,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 30,
      height: 30,
    },
  },
}));

const SearchInput = (props) => {
  const [focus, setFocus] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState(false);
  const [value, setValue] = React.useState("");
  const iconStyle = useStyles();
  const inputContainer = React.useRef();

  const handleOnChange = (value) => {
    setValue(value);
    if (value.length > 0 && /\S/.test(value)) {
      setFocus(true);
      const newSuggestions = [...props.followedUsers, ...props.unfollowedUsers].filter((el) => {
        return el.name.toLowerCase().trim().includes(value.toLowerCase().trim());
      });
      setSuggestions(newSuggestions);
    } else {
      setFocus(false);
      setSuggestions([]);
    }
  };

  const handleOutsideClick = (event) => {
    if (!inputContainer.current.contains(event.target)) {
      setFocus(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classnames(classes.searchInputComponent, focus && classes.removeBorderRadius)} ref={inputContainer}>
        <SearchIcon className={iconStyle.icon} />
        <input
          onFocus={() => {
            if (suggestions.length) {
              setFocus(true);
            }
          }}
          placeholder="Search on Friends"
          className={classes.searchInput}
          value={value}
          onChange={(e) => {
            handleOnChange(e.target.value);
          }}
        />
      </div>
      <AutoComplete focus={focus} suggestions={suggestions} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followedUsers: state.userData.followedUsers,
    unfollowedUsers: state.userData.unfollowedUsers,
  };
};

export default connect(mapStateToProps)(SearchInput);
