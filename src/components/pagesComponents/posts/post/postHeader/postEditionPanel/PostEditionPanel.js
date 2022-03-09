import React from 'react';

import { useActions } from '../../../../../../utilities/hooks/useActions';
import classes from './postEditionPanel.module.scss';
import PostEditionPanelOption from './postEditionPanelOption/PostEditionPanelOption';
import { MODAL_TYPES } from '../../../../../../modalMenager/ModalMenager';

const PostEditionPanel = (props) => {
  const { post, setIsEditionPanelShown, postEditionPanelContainerRef } = props;
  const { removePost, showModal } = useActions();

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

  const handleEdit = () => {
    showModal(MODAL_TYPES.POST_EDITION, post);
    setIsEditionPanelShown(false);
  };

  return (
    <div className={classes.postEditionPanelComponent} data-test='component-post-edition-panel'>
      <PostEditionPanelOption text='Remove' testAttr='remove-btn' onClick={() => removePost(post)} />
      <PostEditionPanelOption text='Edit' testAttr='edit-btn' onClick={handleEdit} />
    </div>
  );
};

export default PostEditionPanel;
