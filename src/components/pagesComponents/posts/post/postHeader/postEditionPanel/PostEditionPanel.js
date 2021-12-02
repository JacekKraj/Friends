import React from 'react';

import classes from './postEditionPanel.module.scss';
import PostEditionPanelOption from './postEditionPanelOption/PostEditionPanelOption';

const PostEditionPanel = (props) => {
  const { handleDelete, handleEdit, setIsEditionPanelShown, postEditionPanelContainerRef } = props;

  const handleOutsideClick = (event) => {
    if (!postEditionPanelContainerRef.current?.contains(event.target)) {
      setIsEditionPanelShown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={classes.postEditionPanelComponent} data-test='component-post-edition-panel'>
      <PostEditionPanelOption text='Remove' testAttr='remove-btn' onClick={handleDelete} />
      <PostEditionPanelOption text='Edit' testAttr='edit-btn' onClick={handleEdit} />
    </div>
  );
};

export default PostEditionPanel;
