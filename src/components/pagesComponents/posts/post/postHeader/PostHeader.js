import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';

import { theme } from './../../../../../utilities/breakpoints/breakpoints';
import classes from './postHeader.module.scss';
import PostEditionPanel from './postEditionPanel/PostEditionPanel';
import * as actions from './../../../../../actions/index';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    cursor: 'pointer',
    [theme.breakpoints.up('0')]: {
      width: 26,
      height: 26,
    },
    [theme.breakpoints.up('400')]: {
      width: 33,
      height: 33,
    },

    [theme.breakpoints.up('768')]: {
      width: 50,
      height: 50,
    },

    [`${theme.breakpoints.up('600')} and (orientation:landscape)`]: {
      width: 31,
      height: 31,
    },

    [`${theme.breakpoints.up('800')} and (orientation:landscape)`]: {
      width: 35,
      height: 35,
    },

    [`${theme.breakpoints.up('1000')} and (orientation:landscape)`]: {
      width: 39,
      height: 39,
    },
  },
}));

const PostHeader = (props) => {
  const { author, currUserModifiedEmail, onRemovePost, post, setIsEditionModalShown } = props;

  const [isEditionPanelShown, setIsEditionPanelShown] = React.useState(false);

  const iconStyle = useStyles();

  const postEditionPanelContainerRef = React.useRef(null);

  const countCreationTime = React.useMemo(() => {
    const date = new Date(post.creationTime);
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const creationTime = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} | ${date.getHours()}:${minutes}`;
    return creationTime;
  }, [post.creationTime]);

  const isCurrentUserPost = currUserModifiedEmail === author.modifiedEmail;

  return (
    <div className={classes.postHeader}>
      <NavLink to={`/users?user=${author.modifiedEmail}`}>
        <div className={classes.author}>
          <img src={author.profileImage} className={classes.profileImage} alt='post author profile image' />
          <div>
            <p className={classes.authorName}>{author.name}</p>
            <p className={classes.postCreationTime}>{countCreationTime}</p>
          </div>
        </div>
      </NavLink>
      {isCurrentUserPost && (
        <div className={classes.postEditionPanelContainer} ref={postEditionPanelContainerRef}>
          <MoreHorizIcon
            className={iconStyle.icon}
            data-test='post-edition-icon'
            onClick={() => {
              setIsEditionPanelShown(!isEditionPanelShown);
            }}
          />
          {isEditionPanelShown && (
            <PostEditionPanel
              setIsEditionPanelShown={setIsEditionPanelShown}
              postEditionPanelContainerRef={postEditionPanelContainerRef}
              handleDelete={() => {
                onRemovePost(post.index, author.modifiedEmail, post.url);
              }}
              handleEdit={() => setIsEditionModalShown(true)}
            />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovePost: (id, user, isUrl) => dispatch(actions.removePost(id, user, isUrl)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostHeader);
