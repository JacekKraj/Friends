import React from 'react';

import classes from './postEditionPanel.module.scss';
import PostEditionPanelOption from './postEditionPanelOption/PostEditionPanelOption';

const PostEditionPanel = ({ handleDelete, handleEdit, setShowEditionPanel }) => {
  const postEditionPanelRef = React.useRef();

  const handleOutsideClick = (event) => {
    if (!postEditionPanelRef.current?.contains(event.target)) {
      setShowEditionPanel(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={classes.postEditionPanelComponent} data-test='component-post-edition-panel' ref={postEditionPanelRef}>
      <PostEditionPanelOption text='Remove' testAttr='remove-btn' onClick={handleDelete} />
      <PostEditionPanelOption text='Edit' testAttr='edit-btn' onClick={handleEdit} />
    </div>
  );
};

export default PostEditionPanel;
