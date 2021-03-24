import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import classes from "./searchInput.module.scss";

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
  const iconStyle = useStyles();
  return (
    <div className={classes.searchInputComponent}>
      <SearchIcon className={iconStyle.icon} />
      <input placeholder="Search on Friends" className={classes.searchInput} />
    </div>
  );
};

export default SearchInput;
