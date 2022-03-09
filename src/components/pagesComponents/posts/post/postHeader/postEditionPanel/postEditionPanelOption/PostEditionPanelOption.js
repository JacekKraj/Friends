import React from 'react';

import classes from './postEditionPanelOption.module.scss';

const PostEditionPanelOption = ({ text, onClick, testAttr }) => {
  return (
    <button type='button' className={classes.postEditionPanelOptionComponent} onClick={onClick} data-test={testAttr}>
      {text}
    </button>
  );
};

export default PostEditionPanelOption;
