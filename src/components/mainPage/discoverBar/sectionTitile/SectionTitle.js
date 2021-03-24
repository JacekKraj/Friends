import React from "react";

import classes from "./sectionTitle.module.scss";

const SectionTitle = (props) => {
  return <h3 className={classes.sectionTitleComponent}>{props.title}</h3>;
};

export default SectionTitle;
