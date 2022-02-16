import React from 'react';
import { connect } from 'react-redux';

import * as actions from './../../../../../../actions';
import classes from './postEditionPanel.module.scss';
import PostEditionPanelOption from './postEditionPanelOption/PostEditionPanelOption';
import { MODAL_TYPES } from '../../../../../../modalMenager/ModalMenager';

const PostEditionPanel = (props) => {
  const { onRemovePost, onShowModal, post, setIsEditionPanelShown, postEditionPanelContainerRef } = props;

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
    onShowModal(MODAL_TYPES.POST_EDITION, post);
    setIsEditionPanelShown(false);
  };

  return (
    <div className={classes.postEditionPanelComponent} data-test='component-post-edition-panel'>
      <PostEditionPanelOption text='Remove' testAttr='remove-btn' onClick={() => onRemovePost(post)} />
      <PostEditionPanelOption text='Edit' testAttr='edit-btn' onClick={handleEdit} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovePost: (post) => dispatch(actions.removePost(post)),
    onShowModal: (type, props) => dispatch(actions.showModal(type, props)),
  };
};

export default connect(null, mapDispatchToProps)(PostEditionPanel);
