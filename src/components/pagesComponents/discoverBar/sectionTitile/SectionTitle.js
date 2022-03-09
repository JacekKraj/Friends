import React from 'react';

import classes from './sectionTitle.module.scss';

const SectionTitle = ({ title }) => {
  return <h3 className={classes.sectionTitleComponent}>{title}</h3>;
};

export default SectionTitle;
